"use client";

import { useQuery } from "@tanstack/react-query";
import { unwrapActionResult } from "@/utils/error-helper";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { LeaderboardTable } from "./leaderboard-table";
import { getLeaderboard } from "@/app/dashboard/leaderboard/leaderboard-actions";
import { leaderboard_table_column } from "./leaderboard-table-column";
import { type SearchParams } from "@/app/dashboard/leaderboard/page";

export default function LeaderboardTableWrapper({
  searchParams,
  month,
}: {
  searchParams: SearchParams;
  month: Date | undefined;
}) {
  const {
    data: leaderboardData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const result = await getLeaderboard();
      const unwrappedResult = unwrapActionResult(result);
      if (!unwrappedResult) return null;
      return unwrappedResult[0];
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !leaderboardData) {
    if (!leaderboardData) {
      return <Error message={error?.message} refetch={refetch} />;
    }
  }

  return (
    <LeaderboardTable
      columns={leaderboard_table_column}
      data={leaderboardData.leaderboard}
    />
  );
}
