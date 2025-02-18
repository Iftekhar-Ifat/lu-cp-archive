export type ContestDifficultyEnum = "EASY" | "MEDIUM" | "HARD";

export type ShortContest = {
  title: string;
  description: string;
  href: string;
  added_by: string;
  difficulty: ContestDifficultyEnum;
  tags: string[];
};
