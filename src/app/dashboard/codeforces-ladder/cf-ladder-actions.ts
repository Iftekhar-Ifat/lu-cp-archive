"use server";

import { type ActionResult } from "@/utils/error-helper";
import {
  CFDifficultyLevelsSchema,
  CFProblemSchema,
} from "@/utils/schema/cf-problem";
import { prisma } from "@/lib/prisma";
import { type CFProblem } from "@/types/types";
import { z } from "zod";

async function getCFProblemsByDifficulty(
  difficultyLevel: number
): Promise<ActionResult<CFProblem[]>> {
  const validation = CFDifficultyLevelsSchema.safeParse({
    difficulty: difficultyLevel,
  });

  console.log(validation.error);

  if (validation.error) {
    return { error: "Invalid difficulty level" };
  }
  try {
    const rawCFProblems = await prisma.cf_problems.findMany({
      where: { difficulty_level: difficultyLevel, approved: true },
      orderBy: {
        created_at: "asc",
      },
      include: {
        addedBy: {
          select: {
            user_name: true,
          },
        },
      },
    });

    const cfProblems = rawCFProblems.map((problem) => ({
      ...problem,
      added_by: problem.addedBy.user_name,
    }));

    const validation = z.array(CFProblemSchema).safeParse(cfProblems);

    if (validation.error) {
      return { error: "Invalid codeforces problem data" };
    }

    return { data: cfProblems };
  } catch (err) {
    console.error("Error fetching codeforces problems:", err);
    return { error: "Failed to fetch codeforces problems" };
  }
}

export { getCFProblemsByDifficulty };
