"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import {
  type ContestStatusType,
  type Contest,
  type ContestDifficultyType,
} from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { ContestFormSchema, ContestSchema } from "@/utils/schema/contest";
import { type ContestType } from "@prisma/client";
import { z } from "zod";

async function createContest(
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    difficulty: ContestDifficultyType;
  },
  contestType: ContestType
) {
  const validateData = ContestFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasAddPermission = hasPermission(user.user_type, "add-contest");

  if (!hasAddPermission) {
    return { error: "You do not have permission to create a contest" };
  }

  try {
    await prisma.contests.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        difficulty: data.difficulty,
        type: contestType,
        added_by: user.id,
        tags: {
          create: data.tags.map((tag) => ({
            tagId: {
              connectOrCreate: {
                where: { name: tag },
                create: {
                  name: tag,
                },
              },
            },
          })),
        },
      },
    });
  } catch (error) {
    console.error("Error creating contest:", error);
    return { error: `Failed to create contest` };
  }
}

async function getContests(
  contest_type: ContestType
): Promise<ActionResult<Contest[]>> {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const rawContests = await prisma.contests.findMany({
      where: {
        type: contest_type,
        approved: true,
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
      },
    });

    const contests = rawContests.map((contest) => ({
      ...contest,
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

async function updateContest(data: {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: ContestDifficultyType;
}) {
  // TODO
}

async function deleteContest(contestId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasAddPermission = hasPermission(user.user_type, "mutate-contest");

  if (!hasAddPermission) {
    return { error: "You do not have permission to delete a contest" };
  }

  try {
    await prisma.contests.delete({
      where: {
        id: contestId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating contest:", error);
    return { error: `Failed to create contest` };
  }
}

async function updateContestStatus(
  contestId: string,
  status: ContestStatusType | null
) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const updatedStatus = await prisma.contest_status.upsert({
      where: {
        user_id_contest_id: {
          user_id: user.id,
          contest_id: contestId,
        },
      },
      update: {
        status,
      },
      create: {
        user_id: user.id,
        contest_id: contestId,
        status,
      },
    });

    return { success: true, data: updatedStatus };
  } catch (error) {
    console.error("Error updating contest status:", error);
    return { error: "Failed to update contest status" };
  }
}

export {
  createContest,
  updateContest,
  getContests,
  deleteContest,
  updateContestStatus,
};
