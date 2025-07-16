// Testing
export const getTopics = async () => {
  return [
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
};

export const getTopicBySlug = async (slug: string) => {
  const topics = await getTopics();
  return topics.find((topic) => topic.slug === slug) || null;
};
