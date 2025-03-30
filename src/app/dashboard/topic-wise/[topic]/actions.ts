"use server";

import { type User, type ContestDifficultyType } from "@/utils/types";
import { type Tag } from "emblor";

const createProblemAction = async (data: {
  name: string;
  description: string;
  link: string;
  tags: Tag[];
  difficulty: ContestDifficultyType;
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
  tags: Tag[];
  difficulty: ContestDifficultyType;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Problem created successfully" };
};

export { createProblemAction, updateProblemAction };
