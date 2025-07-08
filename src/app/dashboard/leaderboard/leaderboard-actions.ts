"use server";

import { prisma } from "@/lib/prisma";
import {
  leaderboardDataSchema,
  leaderboardDateSchema,
} from "@/utils/schema/leaderboard";
import { z } from "zod";

async function getLeaderboard(selectedMonth: number, selectedYear: number) {
  try {
    const [leaderboard, lastUpdated] = await Promise.all([
      prisma.leaderboards.findMany({
        where: {
          month: selectedMonth,
          year: selectedYear,
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              user_name: true,
              image: true,
            },
          },
          rank: true,
          total_points: true,
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
    const validation = z.array(leaderboardDataSchema).safeParse(leaderboard);

    if (validation.error) {
      return { error: "Invalid leaderboard data" };
    }

    return {
      success: true,
      data: { leaderboard, last_updated: lastUpdated?.updated_at },
    };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { error: "Failed to fetch leaderboard" };
  }
}

async function getLeaderboardDates() {
  try {
    const leaderboardDates = await prisma.leaderboards.groupBy({
      by: ["year", "month"],
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    const validation = z
      .array(leaderboardDateSchema)
      .safeParse(leaderboardDates);

    if (validation.error) {
      return { error: "Invalid leaderboard date" };
    }

    return { success: true, data: leaderboardDates };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { error: "Failed to fetch leaderboard" };
  }
}

export { getLeaderboard, getLeaderboardDates };
