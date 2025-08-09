"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ArrowUpFromLine,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";
import LeaderboardGenerationModal from "@/components/generate-leaderboard/leaderboard-generation-modal";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";
import GeneratedLeaderboardTable from "@/components/generate-leaderboard/generated-leaderboard-table/generated-leaderboard-table";
import { toast } from "sonner";
import {
  getMonthlyLeaderboard,
  publishGeneratedLeaderboard,
  updateLeaderboard,
} from "../generate-leaderboard-actions";
import { isActionError, unwrapActionResult } from "@/utils/error-helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { format } from "date-fns";
import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";
import GeneratedLeaderboardPointsTable from "@/components/generate-leaderboard/generated-leaderboard-table/generated-leaderboard-points-table";
import LeaderboardGuide from "./LeaderboardGuide";

export default function GenerateLeaderboardSection() {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccessfulGeneration, setIsSuccessfulGeneration] = useState(false);
  const [additional_points, setAdditionalPoints] = useState<
    Record<string, number>
  >({});
  const [generatedData, setGeneratedData] = useState<GeneratedLeaderboard[]>(
    []
  );
  const [generatedLeaderboard, setGeneratedLeaderboard] = useState<
    GeneratedLeaderboard[]
  >([]);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<Date | undefined>();
  const [updatedData, setUpdatedData] = useState<GeneratedLeaderboard[] | null>(
    null
  );

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["monthly-leaderboard"],
    queryFn: async () => {
      const result = await getMonthlyLeaderboard();

      const unwrappedResult = unwrapActionResult(result);

      if (!unwrappedResult) return undefined;

      setLastUpdatedDate(unwrappedResult.last_updated);

      const leaderboard = unwrappedResult.leaderboard.map((item) => ({
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

      setAdditionalPoints(additionalPointsMap);
      setGeneratedData(leaderboard);

      return { success: true };
    },
    staleTime: Infinity,
  });

  const handleAdditionalPointsChange = (userId: string, value: string) => {
    if (value === "") {
      setAdditionalPoints((prev) => {
        const new_additional_points = { ...prev };
        delete new_additional_points[userId];
        return new_additional_points;
      });
    } else {
      const numValue = Number.parseInt(value) || 0;
      setAdditionalPoints((prev) => ({
        ...prev,
        [userId]: numValue,
      }));
    }
  };

  // Apply additional_points to the base data
  const updatedDataMemo = useMemo(() => {
    const withTotalPoints = generatedData.map((entry) => {
      const addedPoints = additional_points[entry.user.id] ?? 0;
      const newTotalPoints = entry.generated_point + addedPoints;
      return {
        ...entry,
        additional_points: addedPoints,
        total_points: newTotalPoints,
      };
    });

    // Sort by total_points descending
    const sorted = [...withTotalPoints].sort(
      (a, b) => b.total_points - a.total_points
    );

    // Assign ranks
    return sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [generatedData, additional_points]);

  useEffect(() => {
    setUpdatedData(updatedDataMemo);
  }, [updatedDataMemo]);

  const handleDeleteRow = (userId: string) => {
    setGeneratedData((prevData) =>
      prevData.filter((item) => item.user.id !== userId)
    );

    // Also remove any additional points for the deleted user
    setAdditionalPoints((prev) => {
      const newAdditionalPoints = { ...prev };
      delete newAdditionalPoints[userId];
      return newAdditionalPoints;
    });
  };

  const handleLeaderboardUpdate = async () => {
    if (!updatedData || updatedData.length <= 0) {
      return toast.error("Don't have enough data to update");
    }
    try {
      setIsUpdating(true);
      const result = await updateLeaderboard(updatedData);

      if (isActionError(result)) {
        toast.error(result.error, { position: "top-center" });
      } else {
        toast.success("Leaderboard Updated", { position: "top-center" });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLeaderboardPublish = async () => {
    if (!updatedData || updatedData.length <= 0) {
      return toast.error("Don't have enough data to save");
    }
    try {
      setIsUpdating(true);
      const result = await publishGeneratedLeaderboard(updatedData, new Date());

      if (isActionError(result)) {
        toast.error(result.error, { position: "top-center" });
      } else {
        toast.success("Leaderboard Published", { position: "top-center" });
        queryClient.invalidateQueries({ queryKey: ["monthly-leaderboard"] });
      }
    } finally {
      setIsUpdating(false);
      setUpdatedData(null);
    }
  };

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
      <LeaderboardGuide />
      <div>
        {lastUpdatedDate && (
          <div>
            {isSuccessfulGeneration ? (
              <div className="font-mono">Updated Leaderboard</div>
            ) : (
              <div className="font-mono">Weekly Leaderboard</div>
            )}
            <div className="mb-4 flex justify-end">
              <div className="text-sm">
                <span className="mr-2">Last updated:</span>
                <span className="text-muted-foreground">
                  {format(new Date(lastUpdatedDate), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
        )}
        {updatedData && updatedData.length > 0 && (
          <GeneratedLeaderboardTable
            additional_points={additional_points}
            data={updatedData}
            onAdditionalPointsChange={handleAdditionalPointsChange}
            onDeleteRow={handleDeleteRow}
          />
        )}
      </div>

      <div className="my-4 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
        <Button
          size="lg"
          className="w-full px-4 text-lg md:w-auto"
          onClick={() => setOpen(true)}
        >
          <Sparkles className="mr-2" />
          {isSuccessfulGeneration
            ? "Re-Generate Leaderboard"
            : "Generate Leaderboard"}
        </Button>

        <Button
          disabled={isUpdating}
          size="lg"
          className="w-full px-4 text-lg md:w-auto"
          onClick={handleLeaderboardUpdate}
        >
          {isUpdating ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" />
              Updating Leaderboard...
            </>
          ) : (
            <>
              <Save size={20} className="mr-2" />
              Update Leaderboard
            </>
          )}
        </Button>
      </div>
      <div className="mb-6 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
        {updatedData && updatedData.length > 0 && (
          <>
            <Button
              size="lg"
              className="w-full px-4 text-lg md:w-auto"
              onClick={() => setUpdatedData(generatedLeaderboard)}
            >
              <ArrowUpDown className="mr-2" />
              Use Last Week&apos;s Data
            </Button>
            <Button
              disabled={isUpdating}
              size="lg"
              className="w-full px-4 text-lg md:w-auto"
              onClick={handleLeaderboardPublish}
            >
              {isUpdating ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Publishing Leaderboard...
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="mr-2" />
                  Publish Leaderboard
                </>
              )}
            </Button>
          </>
        )}
      </div>
      {generatedLeaderboard.length ? (
        <ExpandableWrapper>
          <div className="mb-4 font-mono">{"This week's generated points"}</div>
          <GeneratedLeaderboardPointsTable data={generatedLeaderboard} />
        </ExpandableWrapper>
      ) : null}
      <LeaderboardGenerationModal
        open={open}
        setOpen={setOpen}
        setIsSuccessfulGeneration={setIsSuccessfulGeneration}
        setGeneratedData={setGeneratedData}
        setGeneratedLeaderboard={setGeneratedLeaderboard}
      />
    </div>
  );
}
