"use client";

import { useQuery } from "@tanstack/react-query";
import { getMonthlyLeaderboard } from "../generate-leaderboard-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { format } from "date-fns";
import GeneratedLeaderboardTable from "@/components/generate-leaderboard/generated-leaderboard-table/generated-leaderboard-table";

export default function CurrentMonthLeaderboard() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["monthly-leaderboard"],
    queryFn: async () => {
      const result = await getMonthlyLeaderboard();

      const unwrappedResult = unwrapActionResult(result);
      if (!unwrappedResult) return undefined;

      const leaderboard = unwrappedResult.map((item) => ({
        ...item,
        generated_point: item.total_points,
      }));

      // Build Record<string, number> from user_id → additional_points
      const additionalPointsMap: Record<string, number> = {};
      leaderboard.forEach((item) => {
        if (item.user?.id && typeof item.additional_points === "number") {
          additionalPointsMap[item.user.id] = item.additional_points;
        }
      });

      return {
        leaderboard,
        additionalPointsMap,
      };
    },
    staleTime: Infinity,
  });

  const handleAdditionalPointsChange = () => {};
  const handleDeleteRow = () => {};

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError || !data) {
    if (!data) {
      return <Error message={error?.message} refetch={refetch} />;
    }
  }

  return (
    <div>
      {data.leaderboard.length > 0 && (
        <div className="mb-4 flex justify-end text-sm">
          <span className="mr-2">Last updated:</span>
          <span className="text-muted-foreground">
            {format(new Date(data.leaderboard[0].updated_at), "MMMM d, yyyy")}
          </span>
        </div>
      )}
      <GeneratedLeaderboardTable
        additional_points={data.additionalPointsMap}
        data={data.leaderboard}
        onAdditionalPointsChange={handleAdditionalPointsChange}
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
