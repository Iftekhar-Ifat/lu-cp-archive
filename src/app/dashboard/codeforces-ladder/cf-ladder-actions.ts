"use server";

import { isActionError, type ActionResult } from "@/utils/error-helper";
import {
  CFDifficultyLevelsSchema,
  CFProblemFormSchema,
  CFProblemSchema,
} from "@/utils/schema/cf-problem";
import { prisma } from "@/lib/prisma";
import { type CFProblem } from "@/types/types";
import { z } from "zod";
import { getUserData } from "@/components/shared-actions/getUserData";
import { hasPermission } from "@/utils/permissions";

async function getCFProblemsByDifficulty(
  difficultyLevel: number
): Promise<ActionResult<CFProblem[]>> {
  const validationDifficulty = CFDifficultyLevelsSchema.safeParse({
    difficulty: difficultyLevel,
  });

  if (validationDifficulty.error) {
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

    const validateData = z.array(CFProblemSchema).safeParse(cfProblems);

    if (validateData.error) {
      return { error: "Invalid codeforces problem data" };
    }

    return { data: cfProblems };
  } catch (err) {
    console.error("Error fetching codeforces problems:", err);
    return { error: "Failed to fetch codeforces problems" };
  }
}

async function submitCFProblem(data: {
  title: string;
  url: string;
  difficulty_level: number;
}) {
  const validateData = CFProblemFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasSubmitPermission = hasPermission(
    user.user_type,
    "submit-cf-problem"
  );

  if (!hasSubmitPermission) {
    return { error: "You do not have permission to submit a problem" };
  }

  try {
    await prisma.cf_problems.create({
      data: {
        title: data.title,
        url: data.url,
        difficulty_level: data.difficulty_level,
        added_by: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting problem:", error);
    return { error: "Failed to submit problem" };
  }
}

async function getUnapprovedCFProblemCount() {
  const count = await prisma.cf_problems.count({
    where: {
      approved: false,
    },
  });
  return count;
}

export {
  getCFProblemsByDifficulty,
  submitCFProblem,
  getUnapprovedCFProblemCount,
};
