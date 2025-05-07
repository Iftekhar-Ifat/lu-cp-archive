"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserData() {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "Unauthorized" };
  }

  try {
    const userData = await prisma.users.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!userData) {
      return { error: "User not found" };
    }

    return userData;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { error: "Failed to fetch user profile" };
  }
}

async function getUserById(userId: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { error: "Failed to fetch user profile" };
  }
}

async function getUserByUserName(userName: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { user_name: userName },
    });

    if (!user) {
      return { error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { error: "Failed to fetch user profile" };
  }
}

export { getUserData, getUserById, getUserByUserName };
