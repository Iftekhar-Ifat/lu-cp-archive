"use server";

import { prisma } from "@/lib/prisma";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";
import { monthlyLeaderboardDataSchema } from "@/utils/schema/leaderboard";
import axios, { isAxiosError } from "axios";
import { getMonth, getYear } from "date-fns";
import { z } from "zod";

async function checkCodeforcesStatus() {
  try {
    const response = await axios.get(
      "https://codeforces.com/api/user.status?handle=Fefer_Ivan&from=1&count=1"
    );

    // If no user CF throws 400 but just to be safe
    if (response.data.status !== "OK") {
      return { error: "Codeforces server is down" };
    }
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating user profile:", error);
    if (isAxiosError(error)) {
      if (
        error.response?.status === 400 ||
        error.response?.data?.status === "FAILED"
      ) {
        return {
          error: "Codeforces server is down",
        };
      }
    }
    return { error: "Failed to update profile" };
  }
}

async function getUsersCFhandle() {
  try {
    const users = await prisma.users.findMany({
      where: {
        show_on_leaderboard: true,
      },
      select: {
        id: true,
        cf_handle: true,
        name: true,
        user_name: true,
      },
    });

    // No need - just to be safe and satisfy TS
    const filteredUsers = users.filter(
      (
        user
      ): user is {
        id: string;
        name: string;
        user_name: string;
        cf_handle: string;
      } => user.cf_handle !== null
    );

    return { success: true, data: filteredUsers };
  } catch (error) {
    console.error("Error getting users:", error);
    return { error: "Failed to fetch users" };
  }
}

async function publishGeneratedLeaderboard(
  leaderboardData: GeneratedLeaderboard[],
  date: Date
) {
  try {
    const month = getMonth(date) + 1; // getMonth is 0-indexed
    const year = getYear(date);

    const existing = await prisma.leaderboards.findFirst({
      where: { month, year },
    });

    if (existing) {
      return { error: "Leaderboard for this month already exists." };
    }

    const dataToInsert = leaderboardData.map((entry) => ({
      user_id: entry.user.id,
      month,
      year,
      generated_points: entry.generated_point,
      additional_points: entry.additional_points,
      total_points: entry.total_points,
      rank: entry.rank,
    }));

    await prisma.$transaction([
      prisma.leaderboards.createMany({ data: dataToInsert }),
      prisma.monthly_leaderboard.deleteMany(),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error saving leaderboard:", error);
    return { error: "Failed to save leaderboard" };
  }
}

async function updateLeaderboard(leaderboardData: GeneratedLeaderboard[]) {
  try {
    /* 1) determine target month/year */
    const latest = await prisma.leaderboards.findFirst({
      select: { month: true, year: true },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    const now = new Date();
    const targetMonth = latest ? latest.month : now.getMonth() + 1;
    const targetYear = latest ? latest.year : now.getFullYear();

    /* 2) build history-table operations */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const historyOps: any[] = [];

    if (latest) {
      /* 2a) update existing rows */
      historyOps.push(
        ...leaderboardData.map((entry) =>
          prisma.leaderboards.updateMany({
            where: {
              user_id: entry.user.id,
              month: targetMonth,
              year: targetYear,
            },
            data: {
              generated_points: entry.generated_point,
              additional_points: entry.additional_points,
              total_points: entry.total_points,
              rank: entry.rank,
            },
          })
        )
      );

      /* 2b) insert rows for new users */
      const existingIds = new Set(
        (
          await prisma.leaderboards.findMany({
            where: { month: targetMonth, year: targetYear },
            select: { user_id: true },
          })
        ).map((r) => r.user_id)
      );

      const newRows = leaderboardData
        .filter((e) => !existingIds.has(e.user.id))
        .map((e) => ({
          user_id: e.user.id,
          month: targetMonth,
          year: targetYear,
          generated_points: e.generated_point,
          additional_points: e.additional_points,
          total_points: e.total_points,
          rank: e.rank,
        }));

      if (newRows.length) {
        historyOps.push(prisma.leaderboards.createMany({ data: newRows }));
      }
    } else {
      /* 2c) first time ever – bulk insert for current month/year */
      const rowsToCreate = leaderboardData.map((entry) => ({
        user_id: entry.user.id,
        month: targetMonth,
        year: targetYear,
        generated_points: entry.generated_point,
        additional_points: entry.additional_points,
        total_points: entry.total_points,
        rank: entry.rank,
      }));
      historyOps.push(prisma.leaderboards.createMany({ data: rowsToCreate }));
    }

    /* 3) prepare monthly_leaderboard snapshot */
    const snapshotRows = leaderboardData.map((entry) => ({
      user_id: entry.user.id,
      generated_points: entry.generated_point,
      additional_points: entry.additional_points,
      total_points: entry.total_points,
      rank: entry.rank,
    }));

    /* 4) execute in one transaction */
    await prisma.$transaction([
      ...historyOps,
      prisma.monthly_leaderboard.deleteMany(),
      prisma.monthly_leaderboard.createMany({ data: snapshotRows }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    return { error: "Failed to update leaderboard" };
  }
}

async function getMonthlyLeaderboard() {
  try {
    const [leaderboard, lastUpdated] = await Promise.all([
      prisma.monthly_leaderboard.findMany({
        select: {
          user: {
            select: {
              id: true,
              name: true,
              user_name: true,
            },
          },
          rank: true,
          total_points: true,
          additional_points: true,
        },
      }),
      prisma.monthly_leaderboard.findFirst({
        select: {
          updated_at: true,
        },
        orderBy: {
          updated_at: "desc",
        },
      }),
    ]);

    const validation = z
      .array(monthlyLeaderboardDataSchema)
      .safeParse(leaderboard);

    if (validation.error) {
      return { error: "Invalid monthly leaderboard data" };
    }

    return {
      success: true,
      data: { leaderboard, last_updated: lastUpdated?.updated_at },
    };
  } catch (error) {
    console.error("Error fetching monthly leaderboard:", error);
    return { error: "Failed to fetch monthly leaderboard" };
  }
}

export {
  checkCodeforcesStatus,
  getUsersCFhandle,
  publishGeneratedLeaderboard,
  updateLeaderboard,
  getMonthlyLeaderboard,
};
