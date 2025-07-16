/*
  Warnings:

  - You are about to drop the column `points` on the `leaderboards` table. All the data in the column will be lost.
  - Made the column `additional_points` on table `leaderboards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `generated_points` on table `leaderboards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_points` on table `leaderboards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "leaderboards" DROP COLUMN "points",
ALTER COLUMN "additional_points" SET NOT NULL,
ALTER COLUMN "generated_points" SET NOT NULL,
ALTER COLUMN "total_points" SET NOT NULL;
