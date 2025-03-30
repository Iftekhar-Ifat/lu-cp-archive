"use server";

import { type User } from "@/utils/types";

// Mock function to get user
const getUser = async () => {
  try {
    const userData: User = {
      userId: "1",
      email: "iftekhar@gmail.com",
      name: "Iftekhar",
      userName: "iftekhar",
      userType: "STANDARD",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    new Promise((resolve) => setTimeout(resolve, 2000));
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export { getUser };
