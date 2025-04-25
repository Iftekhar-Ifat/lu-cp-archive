import { ContestType, Difficulty } from "@prisma/client";

export const getContests = (userIds: string[]) => [
  {
    title: "Algorithm Challenge 2023",
    url: "https://example.com/contest/algo-2023",
    description: "A contest focusing on algorithm optimization and efficiency.",
    difficulty: Difficulty.MEDIUM,
    type: ContestType.short_contests,
    added_by: userIds[0],
  },
  {
    title: "Data Structure Marathon",
    url: "https://example.com/contest/ds-marathon",
    description:
      "Test your knowledge of complex data structures in this marathon contest.",
    difficulty: Difficulty.HARD,
    type: ContestType.marathon_contests,
    added_by: userIds[1],
  },
  {
    title: "Beginner Coding Challenge",
    url: "https://example.com/contest/beginner-coding",
    description:
      "Perfect for beginners to practice basic programming concepts.",
    difficulty: Difficulty.EASY,
    type: ContestType.short_contests,
    added_by: userIds[2],
  },
  {
    title: "University Algorithms Competition",
    url: "https://example.com/contest/university-algo",
    description: "Annual algorithmic competition for university students.",
    difficulty: Difficulty.MEDIUM,
    type: ContestType.intra_lu_contests,
    added_by: userIds[0],
  },
  {
    title: "Graph Theory Challenge",
    url: "https://example.com/contest/graph-theory",
    description: "Specialized contest focused on graph algorithms and theory.",
    difficulty: Difficulty.HARD,
    type: ContestType.short_contests,
    added_by: userIds[1],
  },
  {
    title: "Dynamic Programming Cup",
    url: "https://example.com/contest/dp-cup",
    description:
      "Master dynamic programming techniques in this challenging contest.",
    difficulty: Difficulty.HARD,
    type: ContestType.short_contests,
    added_by: userIds[3],
  },
  {
    title: "Summer Coding Sprint",
    url: "https://example.com/contest/summer-sprint",
    description: "Fast-paced contest with a focus on speed and accuracy.",
    difficulty: Difficulty.MEDIUM,
    type: ContestType.short_contests,
    added_by: userIds[4],
  },
  {
    title: "Optimization Challenge",
    url: "https://example.com/contest/optimization",
    description:
      "Focus on creating the most optimized solutions for complex problems.",
    difficulty: Difficulty.MEDIUM,
    type: ContestType.marathon_contests,
    added_by: userIds[5],
  },
  {
    title: "Beginner's Marathon",
    url: "https://example.com/contest/beginners-marathon",
    description: "A longer contest designed for beginners to build confidence.",
    difficulty: Difficulty.EASY,
    type: ContestType.marathon_contests,
    added_by: userIds[6],
  },
  {
    title: "Advanced Algorithms Showdown",
    url: "https://example.com/contest/advanced-algo",
    description: "Elite contest for experts in algorithmic problem-solving.",
    difficulty: Difficulty.HARD,
    type: ContestType.intra_lu_contests,
    added_by: userIds[7],
  },
];
