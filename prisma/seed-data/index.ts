import { StatusType } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";
import { users } from "./users";
import { tags } from "./tags";
import { topics } from "./topics";
import { getContests } from "./contests";

export async function seedUsers(prisma: PrismaClient) {
  console.log("Seeding users...");
  const createdUsers = [];
  for (const userData of users) {
    const user = await prisma.users.create({ data: userData });
    createdUsers.push(user);
  }
  return createdUsers;
}

export async function seedTags(prisma: PrismaClient) {
  console.log("Seeding tags...");
  const createdTags = [];
  for (const tagData of tags) {
    const tag = await prisma.tags.create({ data: tagData });
    createdTags.push(tag);
  }
  return createdTags;
}

export async function seedTopics(prisma: PrismaClient) {
  console.log("Seeding topics...");
  const createdTopics = [];
  for (const topicData of topics) {
    try {
      const topic = await prisma.topics.create({
        data: {
          title: topicData.title,
          description: topicData.description,
          slug: topicData.slug,
        },
      });
      createdTopics.push(topic);
      console.log(`Created topic: ${topic.title}`);
    } catch (error) {
      console.error(`Failed to create topic ${topicData.title}:`, error);
    }
  }
  return createdTopics;
}

export async function seedContests(prisma: PrismaClient, userIds: string[]) {
  console.log("Seeding contests...");
  const contests = getContests(userIds);
  const createdContests = [];

  for (const contestData of contests) {
    const contest = await prisma.contests.create({ data: contestData });
    createdContests.push(contest);
  }
  return createdContests;
}

export async function seedContestTags(
  prisma: PrismaClient,
  contestIds: string[],
  tagIds: string[]
) {
  console.log("Seeding contest tags...");
  const contestTagsData = [
    { contest_id: contestIds[0], tag_id: tagIds[0] }, // algorithms
    { contest_id: contestIds[0], tag_id: tagIds[6] }, // greedy
    { contest_id: contestIds[1], tag_id: tagIds[1] }, // data-structures
    { contest_id: contestIds[1], tag_id: tagIds[4] }, // math
    { contest_id: contestIds[1], tag_id: tagIds[9] }, // recursion
    { contest_id: contestIds[2], tag_id: tagIds[7] }, // sorting
    { contest_id: contestIds[2], tag_id: tagIds[8] }, // binary-search
    // Add more contest-tag relationships as needed
  ];

  for (const tagData of contestTagsData) {
    await prisma.contests_tags.create({ data: tagData });
  }
}

export async function seedContestStatuses(
  prisma: PrismaClient,
  userIds: string[],
  contestIds: string[]
) {
  console.log("Seeding contest statuses...");
  const statusData = [
    {
      user_id: userIds[2],
      contest_id: contestIds[0],
      status: StatusType.DONE,
    },
    {
      user_id: userIds[3],
      contest_id: contestIds[1],
      status: StatusType.InProgress,
    },
    {
      user_id: userIds[4],
      contest_id: contestIds[2],
      status: StatusType.DONE,
    },
    {
      user_id: userIds[5],
      contest_id: contestIds[3],
      status: StatusType.SKIPPED,
    },
    {
      user_id: userIds[6],
      contest_id: contestIds[4],
      status: StatusType.InProgress,
    },
  ];

  for (const status of statusData) {
    await prisma.contest_status.create({ data: status });
  }
}
