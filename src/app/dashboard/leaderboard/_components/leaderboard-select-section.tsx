"use client";

import { useState } from "react";
import LeaderboardMonthPicker from "@/components/leaderboard/leaderboard-month-picker";
import { type SearchParams } from "../page";
import LeaderboardTableWrapper from "@/components/leaderboard/leaderboard-table/leaderboard-table-wrapper";
import TopThreeWinners from "@/components/leaderboard/top-three-winners";

export default function LeaderboardSelectSection({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [month, setMonth] = useState<Date>();

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
          <TopThreeWinners
            winners={[
              {
                rank: 1,
                name: "Iftekhar Ahmed",
                userId: "@iftekhar-ifat",
                points: 500,
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                rank: 2,
                name: "David Brown",
                userId: "@david_b",
                points: 490,
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                rank: 3,
                name: "Frank Miller",
                userId: "@frank_m",
                points: 480,
                image: "/placeholder.svg?height=100&width=100",
              },
            ]}
          />
        </div>
        <LeaderboardTableWrapper searchParams={searchParams} month={month} />
      </div>
    </div>
  );
}
