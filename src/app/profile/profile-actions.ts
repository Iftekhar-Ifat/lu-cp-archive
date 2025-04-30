"use server";

import { prisma } from "@/lib/prisma";

/*
import { prisma } from "@/lib/prisma";
import { getUserData } from "@/components/shared-actions/getUserData";
import { isActionError } from "@/utils/error-helper";

export async function updateUserCompetitiveProfile(
  codeforcesHandle: string | null,
  showOnLeaderboard: boolean
) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: {
        codeforces_handle: codeforcesHandle,
        show_on_leaderboard: showOnLeaderboard,
        updated_at: new Date(),
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { error: "Failed to update profile" };
  }
}
 */

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
