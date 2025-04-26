"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type Problem } from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { ProblemSchema } from "@/utils/schema/problem";
import { z } from "zod";

async function getApproveProblems(): Promise<ActionResult<Problem[]>> {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const rawProblems = await prisma.problems.findMany({
      where: {
        approved: false,
      },
      include: {
        tags: {
          select: {
            tagId: {
              select: {
                name: true,
              },
            },
          },
        },
        status: {
          where: {
            user_id: user.id,
          },
          select: {
            status: true,
          },
        },
        addedBy: {
          select: {
            user_name: true,
          },
        },
        relatedTopic: {
          select: {
            slug: true,
          },
        },
      },
    });

    const problems = rawProblems.map((problem) => ({
      ...problem,
      topic: problem.relatedTopic.slug,
      added_by: problem.addedBy.user_name,
      tags: problem.tags.map((tag) => tag.tagId.name),
      status: problem.status[0]?.status ?? null,
    }));

    const validation = z.array(ProblemSchema).safeParse(problems);

    if (validation.error) {
      return { error: "Invalid problem data" };
    }

    return { data: problems };
  } catch (err) {
    console.error("Error fetching problems:", err);
    return { error: "Failed to fetch problems" };
  }
}

async function approveProblem(problemId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-problem");

  if (!hasApprovePermission) {
    return { error: "You do not have permission to approve a problem" };
  }

  try {
    await prisma.problems.update({
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

export { getApproveProblems, approveProblem };
