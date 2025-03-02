"use server";

import { ContestDifficultyEnum } from "@/utils/types";
import { Tag } from "emblor";

const createContestAction = async (data: {
  name: string;
  description: string;
  link: string;
  tags: Tag[];
  difficulty: ContestDifficultyEnum;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

export { createContestAction };
