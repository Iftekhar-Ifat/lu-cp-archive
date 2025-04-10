import { type Difficulty, type UserType } from "@prisma/client";
// User Types
//
export type USER_TYPE = UserType;

// TEMP
export type User = {
  id: string;
  email: string;
  name: string;
  user_name: string;
  user_type: USER_TYPE;
  created_at: Date;
  updated_at: Date;
};

// Contest Types

export type ContestDifficultyType = Difficulty;

export type Contest = {
  id: string;
  name: string;
  description: string;
  link: string;
  added_by: string;
  difficulty: ContestDifficultyType;
  tags: string[];
};

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
export type ProblemDifficultyType = Difficulty;

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
