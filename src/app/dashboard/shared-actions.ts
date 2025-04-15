"use server";

import { type User } from "@/types/types";

// Mock function to get user
const getUser = async () => {
  try {
    const userData: User = {
      id: "1",
      email: "iftekhar@gmail.com",
      name: "Iftekhar",
      user_name: "iftekhar",
      user_type: "ADMIN",
      created_at: new Date(),
      updated_at: new Date(),
    };

    new Promise((resolve) => setTimeout(resolve, 2000));
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export { getUser };
