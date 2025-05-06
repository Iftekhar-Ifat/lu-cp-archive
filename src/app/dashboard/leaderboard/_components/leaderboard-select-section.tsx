"use client";

import { useEffect, useState } from "react";
import LeaderboardMonthPicker from "@/components/leaderboard/leaderboard-month-picker";
import LeaderboardTableWrapper from "@/components/leaderboard/leaderboard-table/leaderboard-table-wrapper";
import { type LeaderboardDateType } from "@/utils/schema/leaderboard";
import { useRouter, useSearchParams } from "next/navigation";

export default function LeaderboardSelectSection({
  initialDate,
  allowedMonths,
}: {
  initialDate: LeaderboardDateType;
  allowedMonths: LeaderboardDateType[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [preservedInitialDate] = useState<Date>(
    new Date(initialDate.year, initialDate.month - 1)
  );

  const [leaderboardDate, setLeaderboardDate] = useState<Date>(
    new Date(initialDate.year, initialDate.month - 1)
  );

  useEffect(() => {
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const latest = searchParams.get("latest");

    if (year && month) {
      const newDate = new Date(parseInt(year), parseInt(month) - 1);
      setLeaderboardDate(newDate);
    }
    if (latest) {
      setLeaderboardDate(preservedInitialDate);
    }
  }, [preservedInitialDate, searchParams]);

  const handleSelectMonth = (selected: Date) => {
    const selectedYear = selected.getFullYear();
    const selectedMonth = selected.getMonth() + 1;
    const params = new URLSearchParams();
    params.set("year", selectedYear.toString());
    params.set("month", selectedMonth.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <LeaderboardMonthPicker
          leaderboardDate={leaderboardDate}
          allowedMonths={allowedMonths}
          onMonthSelect={handleSelectMonth}
        />
      </div>
      <div>
        <LeaderboardTableWrapper leaderboardDate={leaderboardDate} />
      </div>
    </div>
  );
}
