// User Types
//
export type USER_TYPE = "ADMIN" | "STANDARD" | "POWER";

// TEMP
export type User = {
  userId: string;
  email: string;
  name: string;
  userName: string;
  userType: USER_TYPE;
  createdAt: Date;
  updatedAt: Date;
};

// Contest Types

export type ContestDifficultyType = "EASY" | "MEDIUM" | "HARD";

export type ContestType =
  | "intra-lu-contests"
  | "marathon-contests"
  | "short-contests";

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
export type ProblemDifficultyType = "EASY" | "MEDIUM" | "HARD";

export type Problem = {
  id: string;
  name: string;
  description: string;
  link: string;
  added_by: string;
  difficulty: ProblemDifficultyType;
  tags: string[];
};
