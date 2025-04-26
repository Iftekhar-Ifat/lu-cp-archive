"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import {
  type ProblemDifficulty,
  type Problem,
  type ProblemStatusType,
} from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { ProblemFormSchema, ProblemSchema } from "@/utils/schema/problem";
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

async function submitProblem(
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    difficulty: ProblemDifficulty;
  },
  topicId: string
) {
  const validateData = ProblemFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasSubmitPermission = hasPermission(user.user_type, "submit-problem");

  if (!hasSubmitPermission) {
    return { error: "You do not have permission to submit a problem" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const tagRecords = await Promise.all(
        data.tags.map((tagName) =>
          tx.tags.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          })
        )
      );

      const problem = await tx.problems.create({
        data: {
          title: data.title,
          description: data.description,
          url: data.url,
          difficulty: data.difficulty,
          topic: topicId,
          added_by: user.id,
        },
      });

      await Promise.all(
        tagRecords.map((tag) =>
          tx.problem_tags.create({
            data: {
              problem_id: problem.id,
              tag_id: tag.id,
            },
          })
        )
      );
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting problem:", error);
    return { error: "Failed to submit problem" };
  }
}

async function updateProblem(
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    difficulty: ProblemDifficulty;
  },
  problemId: string,
  topicSlug: string
) {
  const validateData = ProblemFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasMutatePermission = hasPermission(user.user_type, "mutate-problem");

  if (!hasMutatePermission) {
    return { error: "You do not have permission to update a problem" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Step 1: Find the topic by slug
      const topic = await tx.topics.findUnique({
        where: { slug: topicSlug },
      });

      if (!topic) {
        throw new Error(`Topic "${topicSlug}" not found`);
      }

      // Step 2: Get existing tag links
      const existingLinks = await tx.problem_tags.findMany({
        where: { problem_id: problemId },
        select: { tag_id: true },
      });

      const existingTagIds = existingLinks.map((link) => link.tag_id);

      // Step 3: Ensure all new tags exist
      const tagRecords = await Promise.all(
        data.tags.map((tagName) =>
          tx.tags.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          })
        )
      );

      const newTagIds = tagRecords.map((tag) => tag.id);

      // Step 4: Determine tags to add and remove
      const toAdd = newTagIds.filter((id) => !existingTagIds.includes(id));
      const toRemove = existingTagIds.filter((id) => !newTagIds.includes(id));

      // Step 5: Add new tags
      await Promise.all(
        toAdd.map((tagId) =>
          tx.problem_tags.create({
            data: {
              problem_id: problemId,
              tag_id: tagId,
            },
          })
        )
      );

      // Step 6: Remove old tags
      if (toRemove.length > 0) {
        await tx.problem_tags.deleteMany({
          where: {
            problem_id: problemId,
            tag_id: { in: toRemove },
          },
        });
      }

      // Step 7: Update the problem fields
      await tx.problems.update({
        where: { id: problemId },
        data: {
          title: data.title,
          description: data.description,
          url: data.url,
          difficulty: data.difficulty,
          topic: topic.id,
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating problem:", error);
    return { error: "Failed to update problem" };
  }
}

async function deleteProblem(problemId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasDeletePermission = hasPermission(user.user_type, "mutate-problem");

  if (!hasDeletePermission) {
    return { error: "You do not have permission to delete a problem" };
  }

  try {
    await prisma.problems.delete({
      where: {
        id: problemId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting problem:", error);
    return { error: `Failed to deleting problems` };
  }
}

async function updateProblemStatus(
  problemId: string,
  status: ProblemStatusType | null
) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  try {
    const updatedStatus = await prisma.problem_status.upsert({
      where: {
        user_id_problem_id: {
          user_id: user.id,
          problem_id: problemId,
        },
      },
      update: {
        status,
      },
      create: {
        user_id: user.id,
        problem_id: problemId,
        status,
      },
    });

    return { success: true, data: updatedStatus };
  } catch (error) {
    console.error("Error updating problem status:", error);
    return { error: "Failed to update problem status" };
  }
}

async function getUnapprovedProblemCount(topicId: string) {
  const count = await prisma.problems.count({
    where: {
      topic: topicId,
      approved: false,
    },
  });
  return count;
}

export {
  submitProblem,
  updateProblem,
  getTopicsBySlug,
  getProblemsByTopic,
  deleteProblem,
  updateProblemStatus,
  getUnapprovedProblemCount,
};
