import {
  type ContestType,
  type Contest,
  type Problem,
  type ProblemProgressStats,
} from "@/utils/types";

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
    name: "Arrays",
    description:
      "Operations, traversal, searching, sorting, and common array algorithms.",
    slug: "arrays",
  },
  {
    id: "2",
    name: "Linked Lists",
    description:
      "Singly linked, doubly linked, insertion, deletion, and traversal techniques.",
    slug: "linked-lists",
  },
  {
    id: "3",
    name: "Strings",
    description:
      "String manipulation, pattern matching, and common string algorithms.",
    slug: "strings",
  },
  {
    id: "4",
    name: "Stacks",
    description:
      "LIFO data structure, implementation, and common stack problems.",
    slug: "stacks",
  },
  {
    id: "5",
    name: "Queues",
    description: "FIFO data structure, implementation, and applications.",
    slug: "queues",
  },
  {
    id: "6",
    name: "Trees",
    description: "Binary trees, BST, traversals, and tree-based algorithms.",
    slug: "trees",
  },
  {
    id: "7",
    name: "Graphs",
    description:
      "Representation, traversal, shortest path, and common graph algorithms.",
    slug: "graphs",
  },
  {
    id: "8",
    name: "Hash Tables",
    description: "Hashing, collision resolution, and hash-based algorithms.",
    slug: "hash-tables",
  },
  {
    id: "9",
    name: "Heaps",
    description: "Min/max heaps, priority queues, and heap operations.",
    slug: "heaps",
  },
  {
    id: "10",
    name: "Dynamic Programming",
    description: "Memoization, tabulation, and common DP problems.",
    slug: "dynamic-programming",
  },
  {
    id: "11",
    name: "Greedy Algorithms",
    description: "Optimization problems and greedy approach techniques.",
    slug: "greedy-algorithms",
  },
  {
    id: "12",
    name: "Recursion",
    description: "Recursive problem-solving and backtracking techniques.",
    slug: "recursion",
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

const topicWiseProblem: Problem[] = [
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

export async function fetchTopicProblem(topic: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(topic);
  return topicWiseProblem;
}

const progressData: ProblemProgressStats[] = [
  {
    difficulty: "EASY",
    skipped: 2,
    inProgress: 3,
    done: 5,
    total: 15,
  },
  {
    difficulty: "MEDIUM",
    skipped: 1,
    inProgress: 2,
    done: 3,
    total: 10,
  },
  {
    difficulty: "HARD",
    skipped: 0,
    inProgress: 1,
    done: 1,
    total: 5,
  },
];

export async function fetchProblemStats() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return progressData;
}

export async function fetchProblemData(problemType: string) {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  fetchedContestData[0].name = problemType;
  return fetchedContestData;
}
