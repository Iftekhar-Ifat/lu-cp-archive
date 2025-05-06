"use server";

import { prisma } from "@/lib/prisma";
import {
  leaderboardDataSchema,
  leaderboardDateSchema,
} from "@/utils/schema/leaderboard";
import { z } from "zod";

async function getLatestLeaderboard() {
  try {
    const latestEntry = await prisma.leaderboards.findFirst({
      orderBy: [{ year: "desc" }, { month: "desc" }],
      select: {
        month: true,
        year: true,
      },
    });

    if (!latestEntry) {
      return { success: true, data: [] };
    } else {
      const { month, year } = latestEntry;

      const leaderboard = await prisma.leaderboards.findMany({
        where: {
          month,
          year,
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
          points: true,
        },
      });

      const validation = z.array(leaderboardDataSchema).safeParse(leaderboard);

      if (validation.error) {
        return { error: "Invalid leaderboard data" };
      }

      return { success: true, data: [{ leaderboard, latestEntry }] };
    }
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

export { getLatestLeaderboard, getLeaderboardDates };
