import { StatusType } from "@prisma/client";
import type { contests, PrismaClient, problems } from "@prisma/client";
import { users } from "./users";
import { tags } from "./tags";
import { topics } from "./topics";
import { getContests } from "./contests";
import { getProblems } from "./problems";

export async function seedUsers(prisma: PrismaClient) {
  console.log("Seeding users...");
  const createdUsers = [];
  for (const userData of users) {
    try {
      const user = await prisma.users.create({ data: userData });
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    } catch (error) {
      console.error(`Failed to create user ${userData.name}:`, error);
    }
  }
  return createdUsers;
}

export async function seedTags(prisma: PrismaClient) {
  console.log("Seeding tags...");
  const createdTags = [];
  for (const tagData of tags) {
    try {
      const tag = await prisma.tags.create({ data: tagData });
      createdTags.push(tag);
      console.log(`Created tag: ${tag.name}`);
    } catch (error) {
      console.error(`Failed to create tag ${tagData.name}:`, error);
    }
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
          ...topicData,
          approved: true, // All seed topics are approved
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
  const createdContests: contests[] = [];

  try {
    await prisma.$transaction(async (tx) => {
      for (const contestData of contests) {
        const contest = await tx.contests.create({
          data: {
            title: contestData.title,
            description: contestData.description,
            url: contestData.url,
            difficulty: contestData.difficulty,
            type: contestData.type,
            approved: true,
            addedBy: {
              connect: {
                id: contestData.added_by,
              },
            },
          },
        });
        createdContests.push(contest);
        console.log(`Created contest: ${contest.title}`);
      }
    });
  } catch (error) {
    console.error("Failed to create contests:", error);
    throw error;
  }

  return createdContests;
}

export async function seedContestTags(
  prisma: PrismaClient,
  contestIds: string[],
  tagIds: string[]
) {
  console.log("Seeding contest tags...");
  const contestTagsData = contestIds.flatMap((contestId, index) => {
    // Ensure each contest has at least one tag by using the index modulo tagIds.length
    const primaryTagId = tagIds[index % tagIds.length];
    const secondaryTagId = tagIds[(index + 1) % tagIds.length];

    // Return one or two tags for each contest
    return [
      { contest_id: contestId, tag_id: primaryTagId },
      { contest_id: contestId, tag_id: secondaryTagId },
    ];
  });

  try {
    await prisma.$transaction(async (tx) => {
      for (const tagData of contestTagsData) {
        await tx.contests_tags.create({ data: tagData });
        console.log(`Created contest tag relationship`);
      }
    });
  } catch (error) {
    console.error("Failed to create contest tags:", error);
    throw error;
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

  try {
    await prisma.$transaction(async (tx) => {
      for (const status of statusData) {
        await tx.contest_status.create({ data: status });
        console.log(`Created contest status for user ${status.user_id}`);
      }
    });
  } catch (error) {
    console.error("Failed to create contest statuses:", error);
    throw error;
  }
}

export async function seedProblems(
  prisma: PrismaClient,
  userIds: string[],
  topicIds: string[]
) {
  console.log("Seeding problems...");
  const problems = getProblems(userIds);
  const createdProblems: problems[] = [];

  // Map problems to specific topics
  const problemsWithRefs = problems.map((problem, index) => ({
    ...problem,
    topic: topicIds[index % topicIds.length],
  }));

  try {
    await prisma.$transaction(async (tx) => {
      for (const problemData of problemsWithRefs) {
        const problem = await tx.problems.create({
          data: {
            title: problemData.title,
            description: problemData.description,
            url: problemData.url,
            difficulty: problemData.difficulty,
            approved: true,
            addedBy: {
              connect: {
                id: problemData.added_by,
              },
            },
            relatedTopic: {
              connect: {
                id: problemData.topic,
              },
            },
          },
        });
        createdProblems.push(problem);
        console.log(`Created problem: ${problem.title}`);
      }
    });
  } catch (error) {
    console.error("Failed to create problems:", error);
    throw error;
  }

  return createdProblems;
}

export async function seedProblemTags(
  prisma: PrismaClient,
  problemIds: string[],
  tagIds: string[]
) {
  console.log("Seeding problem tags...");
  // Ensure every problem has at least one tag by creating a base mapping
  const problemTagsData = problemIds.flatMap((problemId, index) => {
    // Ensure each problem has at least one tag by using the index modulo tagIds.length
    const primaryTag = tagIds[index % tagIds.length];
    const secondaryTag = tagIds[(index + 1) % tagIds.length];

    // Each problem gets at least two tags
    return [
      { problem_id: problemId, tag_id: primaryTag },
      { problem_id: problemId, tag_id: secondaryTag },
    ];
  });

  try {
    await prisma.$transaction(async (tx) => {
      for (const tagData of problemTagsData) {
        await tx.problem_tags.create({ data: tagData });
        console.log("Created problem tag relationship");
      }
    });
  } catch (error) {
    console.error("Failed to create problem tags:", error);
    throw error;
  }
}

export async function seedProblemStatuses(
  prisma: PrismaClient,
  userIds: string[],
  problemIds: string[]
) {
  console.log("Seeding problem statuses...");
  const statusData = [
    {
      user_id: userIds[0],
      problem_id: problemIds[0],
      status: StatusType.DONE,
    },
    {
      user_id: userIds[1],
      problem_id: problemIds[1],
      status: StatusType.InProgress,
    },
    {
      user_id: userIds[2],
      problem_id: problemIds[2],
      status: StatusType.SKIPPED,
    },
    {
      user_id: userIds[3],
      problem_id: problemIds[3],
      status: StatusType.InProgress,
    },
    {
      user_id: userIds[4],
      problem_id: problemIds[4],
      status: StatusType.DONE,
    },
  ];

  try {
    await prisma.$transaction(async (tx) => {
      for (const status of statusData) {
        await tx.problem_status.create({ data: status });
        console.log(`Created problem status for user ${status.user_id}`);
      }
    });
  } catch (error) {
    console.error("Failed to create problem statuses:", error);
    throw error;
  }
}
