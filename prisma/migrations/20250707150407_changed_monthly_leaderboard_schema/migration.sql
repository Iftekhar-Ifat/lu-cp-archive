/*
  Warnings:

  - You are about to drop the column `month` on the `monthly_leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `monthly_leaderboard` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "monthly_leaderboard_user_id_month_year_key";

-- AlterTable
ALTER TABLE "monthly_leaderboard" DROP COLUMN "month",
DROP COLUMN "year";
