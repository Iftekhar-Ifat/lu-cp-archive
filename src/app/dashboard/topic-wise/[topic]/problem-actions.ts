"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type ContestDifficulty, type Problem } from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { ProblemSchema } from "@/utils/schema/problem";
import { z } from "zod";

async function getTopicsBySlug(urlParam: string) {
  try {
    const topic = await prisma.topics.findUnique({
      where: { slug: urlParam },
    });

    if (!topic) {
      return { error: "Topic not found" };
    }

    return { data: topic };
  } catch (err) {
    console.error("Error fetching topic:", err);
    return { error: "Failed to fetch topic" };
  }
}

async function getProblemsByTopic(
  topicSlug: string
): Promise<ActionResult<Problem[]>> {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const rawProblems = await prisma.problems.findMany({
      where: {
        relatedTopic: {
          slug: topicSlug,
        },
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
        addedBy: {
          select: {
            user_name: true,
          },
        },
      },
    });

    const problems = rawProblems.map((problem) => ({
      ...problem,
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

const createProblemAction = async (data: {
  name: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: ContestDifficulty;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Problem created successfully" };
};

const updateProblemAction = async (data: {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: ContestDifficulty;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Problem created successfully" };
};

export {
  createProblemAction,
  updateProblemAction,
  getTopicsBySlug,
  getProblemsByTopic,
};
