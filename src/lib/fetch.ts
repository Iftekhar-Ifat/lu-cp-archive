import { type ContestType, type Contest } from "@/utils/types";

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
  /* if (fetchedData.length > 0) {
    throw new Error("Failed to fetch data");
  } */
  return fetchedData;
}

const fetchedTopics = [
  {
    id: "1",
    name: "Array",
    description:
      "Operations, traversal, searching, sorting, and common array algorithms.",
    link: "array",
  },
  {
    id: "2",
    name: "Linked List",
    description:
      "Singly linked, doubly linked, insertion, deletion, and traversal techniques.",
    link: "linked-list",
  },
  {
    id: "3",
    name: "String",
    description:
      "String manipulation, pattern matching, and common string algorithms.",
    link: "string",
  },
  {
    id: "4",
    name: "Stack",
    description:
      "LIFO data structure, implementation, and common stack problems.",
    link: "stack",
  },
  {
    id: "5",
    name: "Queue",
    description: "FIFO data structure, implementation, and applications.",
    link: "queue",
  },
  {
    id: "6",
    name: "Tree",
    description: "Binary trees, BST, traversals, and tree-based algorithms.",
    link: "tree",
  },
  {
    id: "7",
    name: "Graph",
    description:
      "Representation, traversal, shortest path, and common graph algorithms.",
    link: "graph",
  },
  {
    id: "8",
    name: "Hash Table",
    description: "Hashing, collision resolution, and hash-based algorithms.",
    link: "hash-table",
  },
  {
    id: "9",
    name: "Heap",
    description: "Min/max heaps, priority queues, and heap operations.",
    link: "heap",
  },
  {
    id: "10",
    name: "Dynamic Programming",
    description: "Memoization, tabulation, and common DP problems.",
    link: "dynamic-programming",
  },
  {
    id: "11",
    name: "Greedy Algorithm",
    description: "Optimization problems and greedy approach techniques.",
    link: "greedy-algorithm",
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

  return fetchedTopics;
}

const fetchedContestData: Contest[] = [
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

export async function fetchContestData(contestType: ContestType) {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  fetchedContestData[0].name = contestType;
  return fetchedContestData;
}
