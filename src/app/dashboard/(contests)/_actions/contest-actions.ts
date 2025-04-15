"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type Contest, type ContestDifficultyType } from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { contestSchema } from "@/utils/schema/contest-form";
import { type ContestType, type Difficulty } from "@prisma/client";
import { z } from "zod";

const createContest = async (
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    difficulty: Difficulty;
  },
  contestType: ContestType
) => {
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
};

const getContestData = async (
  contest_type: ContestType
): Promise<ActionResult<Contest[]>> => {
  try {
    const rawContests = await prisma.contests.findMany({
      where: { type: contest_type },
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
      },
    });

    const contests = rawContests.map((contest) => ({
      ...contest,
      tags: contest.tags.map((tag) => tag.tagId.name),
    }));

    const validation = z.array(contestSchema).safeParse(contests);

    if (!validation.success) {
      return { error: "Invalid contest data" };
    }

    return { data: contests };
  } catch (err) {
    console.error("Error fetching contests:", err);
    return { error: "Failed to fetch contests" };
  }
};

const updateContestAction = async (data: {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: ContestDifficultyType;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

export { createContest, updateContestAction, getContestData };
