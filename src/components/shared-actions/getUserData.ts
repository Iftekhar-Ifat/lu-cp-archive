"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserData() {
  const session = await auth();

  if (!session?.user.email) {
    return { error: "User not found" };
  }

  const userData = await prisma.users.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!userData) {
    return { error: "User not found in database" };
  }

  return userData;
}
