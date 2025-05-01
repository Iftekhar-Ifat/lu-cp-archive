/**
 * Workflow: Problem Solved Status with Local Storage Caching
 *
 * 1. When the user opens the problem table:
 *    - Fetch a list of problems with single difficulty level from searchparams.
 *    - Check for already saved solved status from localStorage.
 *
 * 2. Local Storage Structure:
 *    - Stored as a nested object:
 *      {
 *        [difficulty: number]: {
 *          [problemId: string]: boolean  // true if solved
 *        }
 *      }
 *
 * 3. Cache Check Logic:
 *    - For the given difficulty level, compare the number of problems
 *      with the number of problems stored in localStorage.
 *
 *    - If all current problems are present in localStorage (cache hit ~ no new problem was added):
 *        - Use the stored data to determine solved/unsolved status.
 *
 *    - If some problems are missing (cache miss ~ probably new problem added which is not on the localstorage):
 *        - Fetch the solved status from codeforces only for those missing problems.
 *        - Update localStorage with the new results.
 *
 * ISSUE: One problem remained -> How to revalidate if no new problem was added but
 *        user solved an unsolved problem
 */

import { type CFProblem } from "../cf-problem-table/cf-problem-table-columns";

type SolvedCache = {
  [difficulty: number]: {
    [problemId: string]: boolean;
  };
};

const LOCAL_STORAGE_KEY = "cfSolvedCache";

function getCFSolvedCache(): SolvedCache {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCFSolvedCache(cache: SolvedCache) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
}

export async function mockCheckSolvedProblems(
  difficulty: number,
  problems: CFProblem[]
): Promise<Set<string>> {
  const cache = getCFSolvedCache();
  const existing = cache[difficulty] || {};
  const updated = { ...existing };
  const solvedSet = new Set<string>();

  const missingProblems = problems.filter((p) => !(p.id in existing));

  if (missingProblems.length > 0) {
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    missingProblems.forEach((p, idx) => {
      const isSolved = idx % 2 === 0; // mock solve logic
      updated[p.id] = isSolved;
      if (isSolved) solvedSet.add(p.id);
    });
  }

  // Add solved problems already in cache
  Object.entries(updated).forEach(([pid, solved]) => {
    if (solved) solvedSet.add(pid);
  });

  const newCache = {
    ...cache,
    [difficulty]: updated,
  };
  saveCFSolvedCache(newCache);

  return solvedSet;
}
