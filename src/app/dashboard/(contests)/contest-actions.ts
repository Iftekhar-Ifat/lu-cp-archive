"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import {
  type ContestStatusType,
  type Contest,
  type ContestDifficulty,
} from "@/types/types";
import { type ActionResult, isActionError } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { ContestFormSchema, ContestSchema } from "@/utils/schema/contest";
import { type ContestType } from "@prisma/client";
import { z } from "zod";

async function submitContest(
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    difficulty: ContestDifficulty;
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

  const hasSubmitPermission = hasPermission(user.user_type, "submit-contest");

  if (!hasSubmitPermission) {
    return { error: "You do not have permission to submit a contest" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Upsert all tags
      const tagRecords = await Promise.all(
        data.tags.map((tagName) =>
          tx.tags.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          })
        )
      );

      // 2. Create the contest
      const contest = await tx.contests.create({
        data: {
          title: data.title,
          description: data.description,
          url: data.url,
          difficulty: data.difficulty,
          type: contestType,
          added_by: user.id,
        },
      });

      // 3. Create tag links
      await Promise.all(
        tagRecords.map((tag) =>
          tx.contests_tags.create({
            data: {
              contest_id: contest.id,
              tag_id: tag.id,
            },
          })
        )
      );
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contest:", error);
    return { error: "Failed to submit contest" };
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

async function updateContest(
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    difficulty: ContestDifficulty;
  },
  contestId: string
) {
  const validateData = ContestFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasMutatePermission = hasPermission(user.user_type, "mutate-contest");

  if (!hasMutatePermission) {
    return { error: "You do not have permission to update a contest" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Step 1: Get existing tag links
      const existingLinks = await tx.contests_tags.findMany({
        where: { contest_id: contestId },
        select: { tag_id: true },
      });

      const existingTagIds = existingLinks.map((link) => link.tag_id);

      // Step 2: Ensure all new tags exist
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

      // Step 3: Determine tags to add and remove
      const toAdd = newTagIds.filter((id) => !existingTagIds.includes(id));
      const toRemove = existingTagIds.filter((id) => !newTagIds.includes(id));

      // Step 4: Add new tags
      await Promise.all(
        toAdd.map((tagId) =>
          tx.contests_tags.create({
            data: {
              contest_id: contestId,
              tag_id: tagId,
            },
          })
        )
      );

      // Step 5: Remove old tags
      if (toRemove.length > 0) {
        await tx.contests_tags.deleteMany({
          where: {
            contest_id: contestId,
            tag_id: { in: toRemove },
          },
        });
      }

      // Step 6: Update the contest fields
      await tx.contests.update({
        where: { id: contestId },
        data: {
          title: data.title,
          description: data.description,
          url: data.url,
          difficulty: data.difficulty,
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating contest:", error);
    return { error: "Failed to update contest" };
  }
}

async function deleteContest(contestId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasDeletePermission = hasPermission(user.user_type, "mutate-contest");

  if (!hasDeletePermission) {
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
    console.error("Error deleting contest:", error);
    return { error: `Failed to deleting contest` };
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

async function getUnapprovedContestCount() {
  const count = await prisma.contests.count({
    where: { approved: false },
  });
  return count;
}

export {
  submitContest,
  updateContest,
  getContests,
  deleteContest,
  updateContestStatus,
  getUnapprovedContestCount,
};
