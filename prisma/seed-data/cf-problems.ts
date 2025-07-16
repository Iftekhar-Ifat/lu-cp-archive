const problems = [
  {
    id: "1",
    name: "Watermelon",
    url: "https://codeforces.com/problemset/problem/4/A",
    difficulty: 800,
    addedBy: "alex_coder",
  },
  {
    id: "2",
    name: "Way Too Long Words",
    url: "https://codeforces.com/problemset/problem/71/A",
    difficulty: 800,
    addedBy: "julia_dev",
  },
  {
    id: "3",
    name: "Team",
    url: "https://codeforces.com/problemset/problem/231/A",
    difficulty: 800,
    addedBy: "competitive_pro",
  },
  {
    id: "4",
    name: "Next Round",
    url: "https://codeforces.com/problemset/problem/158/A",
    difficulty: 800,
    addedBy: "alex_coder",
  },
  {
    id: "5",
    name: "Bit++",
    url: "https://codeforces.com/problemset/problem/282/A",
    difficulty: 900,
    addedBy: "julia_dev",
  },
  {
    id: "6",
    name: "Domino piling",
    url: "https://codeforces.com/problemset/problem/50/A",
    difficulty: 900,
    addedBy: "competitive_pro",
  },
  {
    id: "7",
    name: "Beautiful Matrix",
    url: "https://codeforces.com/problemset/problem/263/A",
    difficulty: 1000,
    addedBy: "alex_coder",
  },
  {
    id: "8",
    name: "Petya and Strings",
    url: "https://codeforces.com/problemset/problem/112/A",
    difficulty: 1000,
    addedBy: "julia_dev",
  },
  {
    id: "9",
    name: "Word Capitalization",
    url: "https://codeforces.com/problemset/problem/281/A",
    difficulty: 1000,
    addedBy: "competitive_pro",
  },
  {
    id: "10",
    name: "Petya and Strings",
    url: "https://codeforces.com/problemset/problem/112/A",
    difficulty: 1200,
    addedBy: "julia_dev",
  },
  {
    id: "11",
    name: "Word Capitalization",
    url: "https://codeforces.com/problemset/problem/281/A",
    difficulty: 1200,
    addedBy: "competitive_pro",
  },
  {
    id: "12",
    name: "Spy Detected!",
    url: "https://codeforces.com/contest/1512/problem/A",
    difficulty: 800,
    addedBy: "competitive_pro",
  },
];

export const getCFProblems = (userIds: string[]) => {
  return problems.map((problem) => ({
    title: problem.name,
    url: problem.url,
    difficulty: problem.difficulty,
    added_by: userIds[Math.floor(Math.random() * userIds.length)],
    approved: true,
  }));
};
