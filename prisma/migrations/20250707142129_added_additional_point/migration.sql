/*
  Warnings:

  - Added the required column `additional_points` to the `monthly_leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monthly_leaderboard" ADD COLUMN     "additional_points" DOUBLE PRECISION NOT NULL;
