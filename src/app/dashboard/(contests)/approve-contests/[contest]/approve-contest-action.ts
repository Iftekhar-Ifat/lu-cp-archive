"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type Contest } from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { ContestSchema } from "@/utils/schema/contest";
import { type ContestType } from "@prisma/client";
import { z } from "zod";

async function getApproveContests(
  contest_type: ContestType
): Promise<ActionResult<Contest[]>> {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-contest");

  if (!hasApprovePermission) {
    return { error: "You do not have permission to approve a contest" };
  }

  try {
    const rawContests = await prisma.contests.findMany({
      where: {
        type: contest_type,
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
      },
    });

    const contests = rawContests.map((contest) => ({
      ...contest,
      added_by: contest.addedBy.user_name,
      tags: contest.tags.map((tag) => tag.tagId.name),
      status: contest.status[0]?.status ?? null, // Handle if no status entry exists
    }));

    const validation = z.array(ContestSchema).safeParse(contests);

    if (validation.error) {
      return { error: "Invalid contest data" };
    }

    return { data: contests };
  } catch (err) {
    console.error("Error fetching contests:", err);
    return { error: "Failed to fetch contests" };
  }
}

async function approveContest(contestId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-contest");

  if (!hasApprovePermission) {
    return { error: "You do not have permission to approve a contest" };
  }

  try {
    await prisma.contests.update({
      where: { id: contestId },
      data: {
        approved: true,
        updated_at: new Date(),
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Error updating contest:", err);
    return { error: "Failed to update contest" };
  }
}

export { getApproveContests, approveContest };
