import { problems } from "../../src/components/codeforces-ladder/cf-problem-table/cf-problem-data";

export const getCFProblems = (userIds: string[]) => {
  return problems.map((problem) => ({
    title: problem.name,
    url: problem.url,
    difficulty: problem.difficulty,
    added_by: userIds[Math.floor(Math.random() * userIds.length)],
    approved: true,
  }));
};
