"use server";

import { type User, type ContestDifficulty } from "@/types/types";

const createProblemAction = async (data: {
  name: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: ContestDifficulty;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Problem created successfully" };
};

const updateProblemAction = async (data: {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: ContestDifficulty;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Problem created successfully" };
};

export { createProblemAction, updateProblemAction };
