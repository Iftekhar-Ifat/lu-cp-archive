import Link from "next/link";
import TopicWiseCard from "./topic-wise-card";

export default async function TopicWiseCardSection() {
  const topics = [
    {
      id: "1",
      name: "Arrays",
      description:
        "Operations, traversal, searching, sorting, and common array algorithms.",
      link: "dashboard/topic-wise/arrays",
    },
    {
      id: "2",
      name: "Linked Lists",
      description:
        "Singly linked, doubly linked, insertion, deletion, and traversal techniques.",

      link: "dashboard/topic-wise/linked-lists",
    },
    {
      id: "3",
      name: "Strings",
      description:
        "String manipulation, pattern matching, and common string algorithms.",
      link: "dashboard/topic-wise/strings",
    },
    {
      id: "4",
      name: "Stacks",
      description:
        "LIFO data structure, implementation, and common stack problems.",

      link: "dashboard/topic-wise/stacks",
    },
    {
      id: "5",
      name: "Queues",
      description: "FIFO data structure, implementation, and applications.",

      link: "dashboard/topic-wise/queues",
    },
    {
      id: "6",
      name: "Trees",
      description: "Binary trees, BST, traversals, and tree-based algorithms.",

      link: "dashboard/topic-wise/trees",
    },
    {
      id: "7",
      name: "Graphs",
      description:
        "Representation, traversal, shortest path, and common graph algorithms.",

      link: "dashboard/topic-wise/graphs",
    },
    {
      id: "8",
      name: "Hash Tables",
      description: "Hashing, collision resolution, and hash-based algorithms.",

      link: "dashboard/topic-wise/hash-tables",
    },
    {
      id: "9",
      name: "Heaps",
      description: "Min/max heaps, priority queues, and heap operations.",

      link: "dashboard/topic-wise/heaps",
    },
    {
      id: "10",
      name: "Dynamic Programming",
      description: "Memoization, tabulation, and common DP problems.",

      link: "dashboard/topic-wise/dynamic-programming",
    },
    {
      id: "11",
      name: "Greedy Algorithms",
      description: "Optimization problems and greedy approach techniques.",

      link: "dashboard/topic-wise/greedy-algorithms",
    },
    {
      id: "12",
      name: "Recursion",
      description: "Recursive problem-solving and backtracking techniques.",
      link: "dashboard/topic-wise/recursion",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic, index) => (
        <Link key={index} href={topic.link} className="group">
          <TopicWiseCard topic={topic} />
        </Link>
      ))}
    </div>
  );
}
