import { type ContestSchema } from "@/utils/schema/contest";
import { z } from "zod";
// User Types

export type USER_TYPE = "STANDARD" | "POWER" | "ADMIN";

// TEMP
export type User = {
  id: string;
  name: string;
  email: string;
  user_name: string;
  user_type: USER_TYPE;
  created_at: Date;
  updated_at: Date;
};

export const Difficulty = z.enum(["EASY", "MEDIUM", "HARD"]);

export const ContestType = z.enum([
  "intra_lu_contests",
  "marathon_contests",
  "short_contests",
]);

export type ContestDifficultyType = z.infer<typeof Difficulty>;

export type Contest = z.infer<typeof ContestSchema>;

// Topic Types

export type Topic = {
  id: string;
  name: string;
  description: string;
};

export type TopicWiseCard = {
  id: string;
  name: string;
  description: string;
  slug: string;
};

// Problem Types
export type ProblemDifficultyType = z.infer<typeof Difficulty>;

export type Problem = {
  id: string;
  name: string;
  description: string;
  link: string;
  added_by: string;
  difficulty: ProblemDifficultyType;
  tags: string[];
};

export type ProblemProgressStats = {
  difficulty: ProblemDifficultyType;
  skipped: number;
  inProgress: number;
  done: number;
  total: number;
};
