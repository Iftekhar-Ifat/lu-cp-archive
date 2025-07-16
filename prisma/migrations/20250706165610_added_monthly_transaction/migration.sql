-- CreateTable
CREATE TABLE "monthly_leaderboard" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "generated_points" DOUBLE PRECISION NOT NULL,
    "total_points" DOUBLE PRECISION NOT NULL,
    "rank" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monthly_leaderboard_user_id_month_year_key" ON "monthly_leaderboard"("user_id", "month", "year");

-- AddForeignKey
ALTER TABLE "monthly_leaderboard" ADD CONSTRAINT "monthly_leaderboard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
