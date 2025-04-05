"use server";

import { type ContestDifficultyType } from "@/types/types";
import { type Tag } from "emblor";

const createContestAction = async (data: {
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
  return { success: true, message: "Contest created successfully" };
};

const updateContestAction = async (data: {
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
  return { success: true, message: "Contest created successfully" };
};

export { createContestAction, updateContestAction };
