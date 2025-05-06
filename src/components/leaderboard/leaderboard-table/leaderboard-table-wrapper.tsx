"use client";

import { useQuery } from "@tanstack/react-query";
import { unwrapActionResult } from "@/utils/error-helper";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { LeaderboardTable } from "./leaderboard-table";
import { getLeaderboard } from "@/app/dashboard/leaderboard/leaderboard-actions";
import { leaderboard_table_column } from "./leaderboard-table-column";
import { isolateTopThree } from "../leaderboard-helper";
import TopThreeWinners from "../top-three-winners";

export default function LeaderboardTableWrapper({
  leaderboardDate,
}: {
  leaderboardDate: Date;
}) {
  const {
    data: leaderboardData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "leaderboard",
      `${leaderboardDate.getFullYear()}-${leaderboardDate.getMonth() + 1}`,
    ],
    queryFn: async () => {
      const result = await getLeaderboard(
        leaderboardDate.getMonth() + 1,
        leaderboardDate.getFullYear()
      );

      const unwrappedResult = unwrapActionResult(result);
      if (!unwrappedResult) return undefined;

      const { topThree, rest } = isolateTopThree(unwrappedResult);

      return {
        topThree,
        rest,
      };
    },
    // staleTime: Infinity,
  });

  if (isLoading || !leaderboardDate) {
    return <Loading />;
  }

  if (isError || !leaderboardData) {
    if (!leaderboardData) {
      return <Error message={error?.message} refetch={refetch} />;
    }
  }

  return (
    <div>
      <div className="mb-4">
        <TopThreeWinners winners={leaderboardData.topThree} />
      </div>
      <LeaderboardTable
        columns={leaderboard_table_column}
        data={leaderboardData.rest}
      />
    </div>
  );
}
