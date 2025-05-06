"use client";

import { useQuery } from "@tanstack/react-query";
import { unwrapActionResult } from "@/utils/error-helper";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { LeaderboardTable } from "./leaderboard-table";
import { getLatestLeaderboard } from "@/app/dashboard/leaderboard/leaderboard-actions";
import { leaderboard_table_column } from "./leaderboard-table-column";
import { type SearchParams } from "@/app/dashboard/leaderboard/page";
import { type Dispatch, type SetStateAction } from "react";
import { isolateTopThree } from "../leaderboard-helper";
import { type Leaderboard } from "@/utils/schema/leaderboard";

export default function LeaderboardTableWrapper({
  searchParams,
  month,
  setTopThreeWinners,
}: {
  searchParams: SearchParams;
  month: Date | undefined;
  setTopThreeWinners: Dispatch<SetStateAction<Leaderboard[] | undefined>>;
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
      let result;
      if (searchParams.latest) {
        result = await getLatestLeaderboard();
      }

      /* if (searchParams.year && searchParams.month) {
        result = await ;
      } */

      if (result) {
        const unwrappedResult = unwrapActionResult(result);
        if (!unwrappedResult) return undefined;

        const fullLeaderboard = unwrappedResult[0]?.leaderboard ?? [];

        const { topThree, rest } = isolateTopThree(fullLeaderboard);

        setTopThreeWinners(topThree);

        return {
          latestEntry: unwrappedResult[0].latestEntry,
          leaderboard: rest,
        };
      }
      return undefined;
    },
    staleTime: Infinity,
  });

  if (isLoading || !month) {
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
