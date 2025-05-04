"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type CFProblem } from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { CFProblemSchema } from "@/utils/schema/cf-problem";
import { z } from "zod";

async function getUnapprovedCFProblems(): Promise<ActionResult<CFProblem[]>> {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const rawCFProblems = await prisma.cf_problems.findMany({
      where: {
        approved: false,
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
      return { error: "Invalid problem data" };
    }

    return { data: cfProblems };
  } catch (err) {
    console.error("Error fetching problems:", err);
    return { error: "Failed to fetch problems" };
  }
}

async function approveCFProblem(problemId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-problem");

  if (!hasApprovePermission) {
    return { error: "You do not have permission to approve a problem" };
  }

  try {
    await prisma.cf_problems.update({
      where: { id: problemId },
      data: {
        approved: true,
        updated_at: new Date(),
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Error updating problem:", err);
    return { error: "Failed to update problem" };
  }
}

export { getUnapprovedCFProblems, approveCFProblem };
