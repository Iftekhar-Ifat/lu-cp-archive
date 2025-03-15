// Testing
export const getTopics = async () => {
  return [
    { id: "1", name: "Arrays", slug: "arrays" },
    { id: "2", name: "Linked Lists", slug: "linked-lists" },
    { id: "3", name: "Strings", slug: "strings" },
    { id: "4", name: "Stacks", slug: "stacks" },
    { id: "5", name: "Queues", slug: "queues" },
    { id: "6", name: "Trees", slug: "trees" },
    { id: "7", name: "Graphs", slug: "graphs" },
    { id: "8", name: "Hash Tables", slug: "hash-tables" },
    { id: "9", name: "Heaps", slug: "heaps" },
    { id: "10", name: "Dynamic Programming", slug: "dynamic-programming" },
    { id: "11", name: "Greedy Algorithms", slug: "greedy-algorithms" },
    { id: "12", name: "Recursion", slug: "recursion" },
  ];
};

export const getTopicBySlug = async (slug: string) => {
  const topics = await getTopics();
  return topics.find((topic) => topic.slug === slug) || null;
};
