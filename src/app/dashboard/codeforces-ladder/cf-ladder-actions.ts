"use server";

import { type ActionResult } from "@/utils/error-helper";
import { type CFProblem } from "../../../components/codeforces-ladder/cf-problem-table/cf-problem-table-columns";
import { problems } from "../../../components/codeforces-ladder/cf-problem-table/cf-problem-data";

async function getCFProblemsByDifficulty(
  difficultyLevel: number
): Promise<ActionResult<CFProblem[]>> {
  try {
    /* const validation = z.array(ContestSchema).safeParse(contests);

    if (validation.error) {
      return { error: "Invalid contest data" };
    } */

    const filteredProblems = difficultyLevel
      ? problems.filter((p) => p.difficulty === difficultyLevel)
      : problems;

    return { data: filteredProblems };
  } catch (err) {
    console.error("Error fetching contests:", err);
    return { error: "Failed to fetch contests" };
  }
}

export { getCFProblemsByDifficulty };
