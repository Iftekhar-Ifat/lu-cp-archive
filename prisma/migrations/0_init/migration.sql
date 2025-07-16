-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STANDARD', 'POWER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ContestType" AS ENUM ('intra_lu_contests', 'marathon_contests', 'short_contests');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('DONE', 'InProgress', 'SKIPPED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "user_name" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL DEFAULT 'STANDARD',
    "cf_handle" TEXT,
    "show_on_leaderboard" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "type" "ContestType" NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "added_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contest_status" (
    "status" "StatusType",
    "user_id" TEXT NOT NULL,
    "contest_id" TEXT NOT NULL,

    CONSTRAINT "contest_status_pkey" PRIMARY KEY ("user_id","contest_id")
);

-- CreateTable
CREATE TABLE "contests_tags" (
    "contest_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "contests_tags_pkey" PRIMARY KEY ("contest_id","tag_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "topic" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "added_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_status" (
    "status" "StatusType",
    "user_id" TEXT NOT NULL,
    "problem_id" TEXT NOT NULL,

    CONSTRAINT "problem_status_pkey" PRIMARY KEY ("user_id","problem_id")
);

-- CreateTable
CREATE TABLE "problem_tags" (
    "problem_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "problem_tags_pkey" PRIMARY KEY ("problem_id","tag_id")
);

-- CreateTable
CREATE TABLE "cf_problems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "difficulty_level" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "added_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cf_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboards" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "rank" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaderboards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "topics_title_key" ON "topics"("title");

-- CreateIndex
CREATE UNIQUE INDEX "topics_slug_key" ON "topics"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboards_user_id_month_year_key" ON "leaderboards"("user_id", "month", "year");

-- AddForeignKey
ALTER TABLE "contests" ADD CONSTRAINT "contests_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_status" ADD CONSTRAINT "contest_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_status" ADD CONSTRAINT "contest_status_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contests_tags" ADD CONSTRAINT "contests_tags_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contests_tags" ADD CONSTRAINT "contests_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_topic_fkey" FOREIGN KEY ("topic") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_status" ADD CONSTRAINT "problem_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_status" ADD CONSTRAINT "problem_status_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cf_problems" ADD CONSTRAINT "cf_problems_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboards" ADD CONSTRAINT "leaderboards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

