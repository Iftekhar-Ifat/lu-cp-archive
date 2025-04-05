"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserData() {
  const user = await currentUser();

  if (!user) {
    return { error: "User not found" };
  }

  const userData = await prisma.users.findUnique({
    where: {
      email: user.primaryEmailAddress?.emailAddress,
    },
  });

  if (!userData) {
    return { error: "User not found in database" };
  }

  return userData;
}
