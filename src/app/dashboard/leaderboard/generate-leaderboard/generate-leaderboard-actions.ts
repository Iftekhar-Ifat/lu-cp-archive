"use server";

import { prisma } from "@/lib/prisma";
import axios, { isAxiosError } from "axios";

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
    const usersCFhandles = await prisma.users.findMany({
      where: {
        show_on_leaderboard: true,
      },
      select: {
        cf_handle: true,
      },
    });

    // No need - just to be safe
    const filteredHandles = usersCFhandles
      .map((user) => user.cf_handle)
      .filter((handle): handle is string => handle !== null);

    return { success: true, data: filteredHandles };
  } catch (error) {
    console.error("Error getting users:", error);
    return { error: "Failed to fetch users" };
  }
}

export { checkCodeforcesStatus, getUsersCFhandle };

/* const randomNum = Math.random();
if (randomNum < 0.9) {
  return { error: "Codeforces server is down" };
} */
