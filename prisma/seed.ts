import { PrismaClient } from "@prisma/client";
import {
  seedUsers,
  seedTags,
  seedTopics,
  seedContests,
  seedContestTags,
  seedContestStatuses,
  seedProblems,
  seedProblemTags,
  seedProblemStatuses,
} from "./seed-data";

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("Clearing existing database data...");

  // Delete in reverse order of dependencies to avoid foreign key constraint errors
  await prisma.problem_tags.deleteMany({});
  await prisma.problem_status.deleteMany({});
  await prisma.problems.deleteMany({});
  await prisma.contests_tags.deleteMany({});
  await prisma.contest_status.deleteMany({});
  await prisma.contests.deleteMany({});
  await prisma.tags.deleteMany({});
  await prisma.topics.deleteMany({});
  await prisma.users.deleteMany({});

  console.log("Database cleared successfully");
}

async function main() {
  await clearDatabase();
  console.log("Starting seed process...");

  // Seed data in order of dependencies
  const createdUsers = await seedUsers(prisma);
  const createdTags = await seedTags(prisma);
  const createdTopics = await seedTopics(prisma);

  // Get IDs for relationships
  const userIds = createdUsers.map((user) => user.id);
  const tagIds = createdTags.map((tag) => tag.id);
  const topicIds = createdTopics.map((topic) => topic.id);

  // Seed contests and their relationships
  const createdContests = await seedContests(prisma, userIds);
  const contestIds = createdContests.map((contest) => contest.id);
  await seedContestTags(prisma, contestIds, tagIds);
  await seedContestStatuses(prisma, userIds, contestIds);

  // Seed problems and their relationships
  const createdProblems = await seedProblems(prisma, userIds, topicIds);
  const problemIds = createdProblems.map((problem) => problem.id);
  await seedProblemTags(prisma, problemIds, tagIds);
  await seedProblemStatuses(prisma, userIds, problemIds);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
