"use server";

import { getUserData } from "@/components/shared-actions/actions";
import { prisma } from "@/lib/prisma";
import { type Topic } from "@/types/types";
import { isActionError, type ActionResult } from "@/utils/error-helper";
import { hasPermission } from "@/utils/permissions";
import { TopicFormSchema, TopicSchema } from "@/utils/schema/topic";
import { z } from "zod";

const submitTopic = async (data: {
  title: string;
  description: string;
  slug: string;
}) => {
  const validateData = TopicFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasSubmitPermission = hasPermission(user.user_type, "submit-topic");

  if (!hasSubmitPermission) {
    return { error: "You do not have permission to submit a topic" };
  }

  try {
    await prisma.topics.create({
      data: {
        title: data.title,
        description: data.description,
        slug: data.slug,
        approved: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting topic:", error);
    return { error: "Failed to submit topic" };
  }
};

async function getTopics(): Promise<ActionResult<Topic[]>> {
  try {
    const topics = await prisma.topics.findMany({
      where: { approved: true },
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

const updateTopic = async (
  data: {
    title: string;
    description: string;
  },
  topicId: string
) => {
  const validateData = TopicFormSchema.safeParse(data);

  if (validateData.error) {
    return { error: "Invalid data type" };
  }

  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasMutatePermission = hasPermission(user.user_type, "mutate-topic");

  if (!hasMutatePermission) {
    return { error: "You do not have permission to update a topic" };
  }

  try {
    await prisma.topics.update({
      where: { id: topicId },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating topic:", error);
    return { error: "Failed to update topic" };
  }
};

const deleteTopic = async (topicId: string) => {
  const user = await getUserData();

  if (isActionError(user)) {
    return { error: user.error };
  }

  const hasMutatePermission = hasPermission(user.user_type, "mutate-topic");

  if (!hasMutatePermission) {
    return { error: "You do not have permission to delete a topic" };
  }

  try {
    await prisma.topics.delete({
      where: { id: topicId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting topic:", error);
    return { error: "Failed to delete topic" };
  }
};

async function getUnapprovedTopicCount() {
  const count = await prisma.topics.count({
    where: { approved: false },
  });
  return count;
}

export {
  submitTopic,
  updateTopic,
  getTopics,
  deleteTopic,
  getUnapprovedTopicCount,
};
