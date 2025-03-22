// Testing
export const getTopics = async () => {
  return [
    { id: "1", name: "Array", slug: "array" },
    { id: "2", name: "Linked List", slug: "linked-list" },
    { id: "3", name: "String", slug: "string" },
    { id: "4", name: "Stack", slug: "stack" },
    { id: "5", name: "Queue", slug: "queue" },
    { id: "6", name: "Tree", slug: "tree" },
    { id: "7", name: "Graph", slug: "graph" },
    { id: "8", name: "Hash Table", slug: "hash-table" },
    { id: "9", name: "Heap", slug: "heap" },
    { id: "10", name: "Dynamic Programming", slug: "dynamic-programming" },
    { id: "11", name: "Greedy Algorithm", slug: "greedy-algorithm" },
    { id: "12", name: "Recursion", slug: "recursion" },
  ];
};

export const getTopicBySlug = async (slug: string) => {
  const topics = await getTopics();
  return topics.find((topic) => topic.slug === slug) || null;
};
