"use client";

import { useState } from "react";
import LeaderboardMonthPicker from "@/components/leaderboard/leaderboard-month-picker";
import { type SearchParams } from "../page";
import LeaderboardTableWrapper from "@/components/leaderboard/leaderboard-table/leaderboard-table-wrapper";
import TopThreeWinners from "@/components/leaderboard/top-three-winners";
import { type Leaderboard } from "@/utils/schema/leaderboard";

export default function LeaderboardSelectSection({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [month, setMonth] = useState<Date>();
  const [topThreeWinners, setTopThreeWinners] = useState<Leaderboard[]>();

  const handleSelectMonth = (selected: Date) => {
    setMonth(selected);
    console.log("Selected month:", selected);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <LeaderboardMonthPicker
          month={month}
          onMonthSelect={handleSelectMonth}
        />
      </div>
      <div>
        <div className="mb-4">
          <TopThreeWinners winners={topThreeWinners} />
        </div>
        <LeaderboardTableWrapper
          searchParams={searchParams}
          month={month}
          setTopThreeWinners={setTopThreeWinners}
        />
      </div>
    </div>
  );
}
