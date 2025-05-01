"use server";

import { prisma } from "@/lib/prisma";
import axios, { isAxiosError } from "axios";

export async function updateCFProfile(
  data: { handle: string; showOnLeaderboard: boolean },
  userId: string
) {
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${data.handle}`
    );

    // If no user CF throws 400 but just to be safe
    if (response.data.status !== "OK") {
      return { error: "Codeforces user not found" };
    }

    await prisma.users.update({
      where: { id: userId },
      data: {
        cf_handle: data.handle,
        show_on_leaderboard: data.showOnLeaderboard,
        updated_at: new Date(),
      },
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating user profile:", error);
    if (isAxiosError(error)) {
      if (
        error.response?.status === 400 ||
        error.response?.data?.status === "FAILED"
      ) {
        return {
          error: "Invalid Codeforces handle, Or Codeforces server is down",
        };
      }
    }

    return { error: "Failed to update profile" };
  }
}

async function getUserStats(userId: string) {
  try {
    const statsTuple = await prisma.$transaction([
      prisma.problem_status.count({
        where: { user_id: userId, status: "DONE" },
      }),
      prisma.problems.count(),
      prisma.contest_status.count({
        where: { user_id: userId, status: "DONE" },
      }),
      prisma.contests.count(),
      prisma.problems.count({
        where: { added_by: userId },
      }),
      prisma.contests.count({
        where: { added_by: userId },
      }),
    ]);

    const statKeys = [
      "problemsSolved",
      "totalProblems",
      "contestsSolved",
      "totalContests",
      "problemsAdded",
      "contestsAdded",
    ] as const;

    const stats = Object.fromEntries(
      statKeys.map((key, index) => [key, statsTuple[index]])
    ) as Record<(typeof statKeys)[number], number>;

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error getting user stats:", error);
    return { error: "Failed to fetch user stats" };
  }
}

export { getUserStats };
