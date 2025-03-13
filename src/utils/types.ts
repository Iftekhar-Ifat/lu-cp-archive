export type ContestDifficultyEnum = "EASY" | "MEDIUM" | "HARD";

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

export type Contest = {
  id: string;
  name: string;
  description: string;
  link: string;
  added_by: string;
  difficulty: ContestDifficultyEnum;
  tags: string[];
};

export type Topic = {
  id: string;
  name: string;
  description: string;
};

export type TopicWiseCard = {
  id: string;
  name: string;
  description: string;
  link: string;
};
