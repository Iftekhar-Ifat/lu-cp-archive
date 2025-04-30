"use server";
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

async function getUserStats() {}
