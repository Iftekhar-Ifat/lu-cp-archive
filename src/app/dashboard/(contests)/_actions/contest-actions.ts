"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type ContestDifficultyType } from "@/types/types";
import { isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { type Difficulty, type ContestType } from "@prisma/client";
import { type Tag } from "emblor";

const createContestAction = async (
  data: {
    name: string;
    description: string;
    link: string;
    tags: { text: string }[];
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
        title: data.name,
        description: data.description,
        url: data.link,
        difficulty: data.difficulty,
        type: contestType,
        added_by: user.id,
        tags: {
          create: data.tags.map((tag) => ({
            tagId: {
              connectOrCreate: {
                where: { name: tag.text },
                create: {
                  name: tag.text,
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

const updateContestAction = async (data: {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: Tag[];
  difficulty: ContestDifficultyType;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

export { createContestAction, updateContestAction };
