import { type Contest } from "@/utils/types";

const fetchedData: Contest[] = [
  {
    id: "1",
    name: "Topic Wise",
    description: "Practice Topic wise problems",
    link: "dashboard/topic-wise",
    added_by: "Dewan Abdul Mohaimin Chowdhury",
    difficulty: "EASY",
    tags: ["array", "string", "math", "dp"],
  },
  {
    id: "2",
    name: "Codeforces Ladder",
    description: "Practice Codeforces problem by difficulty level",
    link: "dashboard/codeforces-ladder",
    added_by: "Dewan Abdul Mohaimin Chowdhury",
    difficulty: "EASY",
    tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
  },
  {
    id: "3",
    name: "Leaderboard",
    description: "Leaderboard of LU's competitive programers",
    link: "dashboard/leaderboard",
    added_by: "Iftekhar-Ifat",
    difficulty: "EASY",
    tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
  },
  {
    id: "4",
    name: "Intra LU Contest",
    description: "Problems from previous onsite LU contests",
    link: "dashboard/intra-lu-contests",
    added_by: "Iftekhar-Ifat",
    difficulty: "HARD",
    tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
  },
  {
    id: "5",
    name: "LU Problem Solver Short Contest",
    description: "Short Contests organized by LU Problem Solvers",
    link: "dashboard/short-contests",
    added_by: "Dewan Abdul Mohaimin Chowdhury",
    difficulty: "MEDIUM",
    tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
  },
  {
    id: "6",
    name: "LU Problem Solver Marathon Contest lorem ipsum dolor sit amet LU Problem Solver Marathon Contest lorem ipsum dolor sit amet",
    description:
      "LU Problem Solver Marathon Contest lorem ipsum dolor sit amet LU Problem Solver Marathon Contest lorem ipsum dolor sit amet Long Contests organized by LU Problem Solvers",
    link: "dashboard/marathon-contests",
    added_by:
      "Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury",
    difficulty: "EASY",
    tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
  },
];

export async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // For error checking
  if (fetchedData.length > 0) {
    throw new Error("Failed to fetch data");
  }
  return fetchedData;
}

const fetchedTopics = [
  {
    id: "1",
    name: "Arrays",
    description:
      "Operations, traversal, searching, sorting, and common array algorithms.",
    link: "arrays",
  },
  {
    id: "2",
    name: "Linked Lists",
    description:
      "Singly linked, doubly linked, insertion, deletion, and traversal techniques.",
    link: "linked-lists",
  },
  {
    id: "3",
    name: "Strings",
    description:
      "String manipulation, pattern matching, and common string algorithms.",
    link: "strings",
  },
  {
    id: "4",
    name: "Stacks",
    description:
      "LIFO data structure, implementation, and common stack problems.",
    link: "stacks",
  },
  {
    id: "5",
    name: "Queues",
    description: "FIFO data structure, implementation, and applications.",
    link: "queues",
  },
  {
    id: "6",
    name: "Trees",
    description: "Binary trees, BST, traversals, and tree-based algorithms.",
    link: "trees",
  },
  {
    id: "7",
    name: "Graphs",
    description:
      "Representation, traversal, shortest path, and common graph algorithms.",
    link: "graphs",
  },
  {
    id: "8",
    name: "Hash Tables",
    description: "Hashing, collision resolution, and hash-based algorithms.",
    link: "hash-tables",
  },
  {
    id: "9",
    name: "Heaps",
    description: "Min/max heaps, priority queues, and heap operations.",
    link: "heaps",
  },
  {
    id: "10",
    name: "Dynamic Programming",
    description: "Memoization, tabulation, and common DP problems.",
    link: "dynamic-programming",
  },
  {
    id: "11",
    name: "Greedy Algorithms",
    description: "Optimization problems and greedy approach techniques.",
    link: "greedy-algorithms",
  },
  {
    id: "12",
    name: "Recursion",
    description: "Recursive problem-solving and backtracking techniques.",
    link: "recursion",
  },
];

export async function fetchTopics() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (fetchedTopics.length > 0) {
    throw new Error("Failed to fetch data");
  }
  return fetchedTopics;
}
