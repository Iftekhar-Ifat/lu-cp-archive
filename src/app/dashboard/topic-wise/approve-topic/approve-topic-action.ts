"use server";

import { getUserData } from "@/components/shared-actions/getUserData";
import { prisma } from "@/lib/prisma";
import { type Topic } from "@/types/types";
import { isActionError, type ActionResult } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { TopicSchema } from "@/utils/schema/topic";
import { z } from "zod";

async function getApproveTopics(): Promise<ActionResult<Topic[]>> {
  try {
    const topics = await prisma.topics.findMany({
      where: { approved: false },
      orderBy: {
        created_at: "asc",
      },
    });

    const validation = z.array(TopicSchema).safeParse(topics);

    if (validation.error) {
      return { error: "Invalid topic data" };
    }

    return { data: topics };
  } catch (err) {
    console.error("Error fetching topics:", err);
    return { error: "Failed to fetch topics" };
  }
}

async function approveTopic(topicId: string) {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-topic");

  if (!hasApprovePermission) {
    return { error: "You do not have permission to approve a topic" };
  }

  try {
    await prisma.topics.update({
      where: { id: topicId },
      data: {
        approved: true,
        updated_at: new Date(),
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Error approving topic:", err);
    return { error: "Failed to approve topic" };
  }
}

export { getApproveTopics, approveTopic };
