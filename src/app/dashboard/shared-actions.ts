"use server";

import { prisma } from "@/lib/prisma";

export async function getUserById(userId: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "No user found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { error: "Failed to fetch user profile" };
  }
}
