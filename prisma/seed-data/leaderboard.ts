import { type users } from "@prisma/client";

type LeaderboardEntry = {
  user_id: string;
  points: number;
  rank: number;
  month: number;
  year: number;
};

export const getLastNMonths = (
  n: number
): { month: number; year: number }[] => {
  const result = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({ month: date.getMonth() + 1, year: date.getFullYear() });
  }
  return result;
};

export const getMonthlyLeaderboard = (
  users: users[],
  month: number,
  year: number
): LeaderboardEntry[] => {
  const entries = users.map((user) => ({
    user_id: user.id,
    points: Math.floor(Math.random() * 2000) + 100,
    rank: 0,
    month,
    year,
  }));

  entries.sort((a, b) => b.points - a.points);
  entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return entries;
};
