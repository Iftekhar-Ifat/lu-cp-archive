"use server";

import { prisma } from "@/lib/prisma";
import { type Topic } from "@/types/types";
import { type ActionResult } from "@/utils/error-helper";
import { topicFormSchema } from "@/utils/schema/topic-form";
import { z } from "zod";

const createTopicWiseItemAction = async (data: {
  name: string;
  description: string;
}) => {
  console.log(data);
  // Simulate network delay
  // Also add link from the given name (eg., Linked List -> linked-list)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

async function getTopics(): Promise<ActionResult<Topic[]>> {
  try {
    const topics = await prisma.topics.findMany({
      orderBy: {
        created_at: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
      },
    });

    const validation = z.array(topicFormSchema).safeParse(topics);

    if (validation.error) {
      return { error: "Invalid contest data" };
    }

    return { data: topics };
  } catch (err) {
    console.error("Error fetching contests:", err);
    return { error: "Failed to fetch contests" };
  }
}

const updateTopicWiseItemAction = async (data: {
  id: string;
  name: string;
  description: string;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

export { createTopicWiseItemAction, updateTopicWiseItemAction, getTopics };
