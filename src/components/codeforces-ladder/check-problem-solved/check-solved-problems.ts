/**
 * Workflow: Problem Solved Status with Local Storage Caching
 *
 * 1. When the user opens the problem table:
 *    - Receive a list of Codeforces problems filtered by a single difficulty level.
 *    - Attempt to load solved problem statuses from localStorage cache.
 *
 * 2. Local Storage Structure:
 *    - Stored as a nested object:
 *      {
 *        [difficulty: number]: {
 *          [problemKey: string]: boolean  // true if solved
 *        }
 *      }
 *    - Problem key format: "<contestId>-<index>", e.g., "4-A", "158-B"
 *    - Full object format: 800: {4-A: true, 71-A: true, 231-A: true, 158-A: true}
 *
 * 3. Solved Status Check Logic:
 *    - For the given difficulty, check which problems are already cached.
 *    - Identify problems missing from cache (not yet checked for this user).
 *    - If any problems are missing or marked as false:
 *        - Fetch full submission history using Codeforces API.
 *        - Extract solved problems (verdict === "OK") and update the cache.
 *        - Mark problems as solved based on whether their key exists in the fetched set.
 *
 *    - For problems already in cache:
 *        - Use cached data to determine solved/unsolved status.
 */

import axios, { isAxiosError } from "axios";
import { type CFProblem } from "../cf-problem-table/cf-problem-table-columns";

type SolvedCache = {
  [difficulty: number]: {
    [problemKey: string]: boolean;
  };
  // e.g., 800: {4-A: true, 71-A: true, 231-A: true, 158-A: true}
};

// exporting to invalidate if user changes cf handle
export const CF_CACHE_LS_KEY = "cfSolvedCache";

function getCFSolvedCache(): SolvedCache {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CF_CACHE_LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCFSolvedCache(cache: SolvedCache) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CF_CACHE_LS_KEY, JSON.stringify(cache));
}

function parseProblemKey(url: string): string | null {
  try {
    // Extract the path from the URL (e.g., "/contest/1917/problem/C")
    const path = new URL(url).pathname;

    // Pattern 1: Contest or Gym Problem URL
    // Examples:
    // - "/contest/1917/problem/C" → contestId=1917, index=C
    // - "/gym/104252/problem/B" → contestId=104252, index=B
    const contestOrGymRegex = /^\/(contest|gym)\/(\d+)\/problem\/([A-Z0-9]+)/i;
    const contestOrGymMatch = path.match(contestOrGymRegex);
    if (contestOrGymMatch) {
      const contestId = contestOrGymMatch[2]; // Group 2: contest/gym ID (e.g., "1917")
      const index = contestOrGymMatch[3].toUpperCase(); // Group 3: problem index (e.g., "C")
      return `${contestId}-${index}`;
    }

    // Pattern 2: Problemset Archive URL
    // Example: "/problemset/problem/1917/C" → contestId=1917, index=C
    const problemsetRegex = /^\/problemset\/problem\/(\d+)\/([A-Z0-9]+)/i;
    const problemsetMatch = path.match(problemsetRegex);
    if (problemsetMatch) {
      const contestId = problemsetMatch[1]; // Group 1: contest ID (e.g., "1917")
      const index = problemsetMatch[2].toUpperCase(); // Group 2: problem index (e.g., "C")
      return `${contestId}-${index}`;
    }

    // No valid Codeforces problem URL detected
    return null;
  } catch {
    // Invalid URL format (e.g., "other-url.com/...")
    return null;
  }
}

async function fetchSolvedProblemsFromCodeforces(
  handle: string
): Promise<Set<string>> {
  const solvedProblems = new Set<string>();

  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    if (response.data.status !== "OK" || !response.data.result) {
      console.error("API Error:", response.data.comment || "No data returned");
      return solvedProblems;
    }

    for (const submission of response.data.result) {
      if (submission.verdict === "OK" && submission.problem) {
        const { contestId, index, problemsetName } = submission.problem;

        if (contestId && index) {
          solvedProblems.add(`${contestId}-${index.toUpperCase()}`);
        } else if (problemsetName && index) {
          solvedProblems.add(`${problemsetName.split("/").pop()}-${index}`);
        }
      }
    }
    return solvedProblems;
  } catch (err) {
    console.error("Fetch Error:", isAxiosError(err) ? err.message : err);
    return solvedProblems;
  }
}

export async function checkSolvedProblems(
  difficulty: number,
  problems: CFProblem[],
  cf_handle: string
): Promise<Set<string>> {
  const cache = getCFSolvedCache();
  const existing = cache[difficulty] || {};
  const updated = { ...existing };
  const solvedSet = new Set<string>();

  // Parse problem keys
  const problemKeys = problems
    .map((p) => ({
      key: parseProblemKey(p.url),
      original: p,
    }))
    .filter((p) => p.key !== null) as { key: string; original: CFProblem }[];

  // Fetch full solved set from Codeforces
  const fetchedSolved = await fetchSolvedProblemsFromCodeforces(cf_handle);

  // Determine which problems need to be rechecked:
  // - Not in cache
  // - OR marked as false
  const toCheck = problemKeys.filter(
    ({ key }) => !(key in existing) || existing[key] === false
  );

  for (const { key, original } of toCheck) {
    const isSolved = fetchedSolved.has(key);
    updated[key] = isSolved;
    if (isSolved) solvedSet.add(original.id);
  }

  // Also add already cached and true values
  for (const { key, original } of problemKeys) {
    if (updated[key]) {
      solvedSet.add(original.id);
    }
  }

  const newCache = {
    ...cache,
    [difficulty]: updated,
  };
  saveCFSolvedCache(newCache);

  return solvedSet;
}
