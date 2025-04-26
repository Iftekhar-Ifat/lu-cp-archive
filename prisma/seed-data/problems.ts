import { Difficulty } from "@prisma/client";

export const getProblems = (userIds: string[]) => [
  {
    title: "Two Sum",
    url: "https://example.com/problems/two-sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
    difficulty: Difficulty.EASY,
    topicId: "", // Will be filled with actual topicId ID during seeding
    added_by: userIds[0],
  },
  {
    title: "Binary Tree Level Order Traversal",
    url: "https://example.com/problems/binary-tree-traversal",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    difficulty: Difficulty.MEDIUM,
    topicId: "",
    added_by: userIds[1],
  },
  {
    title: "Dynamic Programming Maximum Path",
    url: "https://example.com/problems/maximum-path",
    description:
      "Find the maximum path sum from top to bottom in a triangle of numbers.",
    difficulty: Difficulty.HARD,
    topicId: "",
    added_by: userIds[2],
  },
  {
    title: "Graph Shortest Path",
    url: "https://example.com/problems/shortest-path",
    description:
      "Find the shortest path between two vertices in a weighted graph.",
    difficulty: Difficulty.HARD,
    topicId: "",
    added_by: userIds[3],
  },
  {
    title: "Stack Implementation",
    url: "https://example.com/problems/stack-impl",
    description:
      "Implement a stack data structure with push, pop, and getMin operations in O(1) time.",
    difficulty: Difficulty.MEDIUM,
    topicId: "",
    added_by: userIds[4],
  },
  {
    title: "Linked List Cycle Detection",
    url: "https://example.com/problems/linked-list-cycle",
    description:
      "Detect if a linked list has a cycle and return the node where the cycle begins.",
    difficulty: Difficulty.MEDIUM,
    topicId: "",
    added_by: userIds[5],
  },
  {
    title: "String Pattern Matching",
    url: "https://example.com/problems/string-pattern",
    description:
      "Find all occurrences of a pattern in a string using KMP algorithm.",
    difficulty: Difficulty.HARD,
    topicId: "",
    added_by: userIds[6],
  },
  {
    title: "Array Rotation",
    url: "https://example.com/problems/array-rotation",
    description:
      "Rotate an array to the right by k steps in O(n) time and O(1) space.",
    difficulty: Difficulty.EASY,
    topicId: "",
    added_by: userIds[7],
  },
  {
    title: "Binary Search Tree Validation",
    url: "https://example.com/problems/bst-validation",
    description: "Determine if a binary tree is a valid binary search tree.",
    difficulty: Difficulty.MEDIUM,
    topicId: "",
    added_by: userIds[8],
  },
  {
    title: "Queue using Stacks",
    url: "https://example.com/problems/queue-using-stacks",
    description:
      "Implement a first-in-first-out (FIFO) queue using only two stacks.",
    difficulty: Difficulty.MEDIUM,
    topicId: "",
    added_by: userIds[0], // Wrap back to first user
  },
];
