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

async function saveGeneratedLeaderboard(
  leaderboardData: GeneratedLeaderboard[],
  date: Date
) {
  try {
    const month = getMonth(date) + 1; // getMonth is 0-indexed
    const year = getYear(date);

    // Check if leaderboard already exists for the given month & year
    const existing = await prisma.leaderboards.findFirst({
      where: {
        month,
        year,
      },
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

    await prisma.$transaction(
      dataToInsert.map((entry) => prisma.leaderboards.create({ data: entry }))
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving leaderboard:", error);
    return { error: "Failed to save leaderboard" };
  }
}

async function getMonthlyLeaderboard() {
  try {
    const leaderboard = await prisma.monthly_leaderboard.findMany({
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
        updated_at: true,
      },
    });

    const validation = z
      .array(monthlyLeaderboardDataSchema)
      .safeParse(leaderboard);

    if (validation.error) {
      return { error: "Invalid monthly leaderboard data" };
    }

    return { success: true, data: leaderboard };
  } catch (error) {
    console.error("Error fetching monthly leaderboard:", error);
    return { error: "Failed to fetch monthly leaderboard" };
  }
}

export {
  checkCodeforcesStatus,
  getUsersCFhandle,
  saveGeneratedLeaderboard,
  getMonthlyLeaderboard,
};
