"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Sparkles } from "lucide-react";
import LeaderboardGenerationModal from "@/components/generate-leaderboard/leaderboard-generation-modal";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";
import GeneratedLeaderboardTable from "@/components/generate-leaderboard/generated-leaderboard-table/generated-leaderboard-table";
import { toast } from "sonner";
import { saveGeneratedLeaderboard } from "../generate-leaderboard-actions";
import { isActionError } from "@/utils/error-helper";

export default function GenerateLeaderboardSection() {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccessfulGeneration, setIsSuccessfulGeneration] = useState(false);
  const [additional_points, setAdditionalPoints] = useState<
    Record<string, number>
  >({});
  const [generatedData, setGeneratedData] = useState<GeneratedLeaderboard[]>(
    []
  );

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
  let updatedData = useMemo(() => {
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

  const handleSave = async () => {
    if (updatedData.length <= 0) {
      return toast.error("Don't have enough data to save");
    }
    try {
      setIsSaving(true);
      const result = await saveGeneratedLeaderboard(updatedData, new Date());

      if (isActionError(result)) {
        toast.error(result.error, { position: "top-center" });
      } else {
        toast.success("Leaderboard Saved", { position: "top-center" });
      }
    } finally {
      setIsSaving(false);
      updatedData = [];
    }
  };

  return (
    <div>
      {isSuccessfulGeneration && (
        <GeneratedLeaderboardTable
          additional_points={additional_points}
          data={updatedData}
          onAdditionalPointsChange={handleAdditionalPointsChange}
          onDeleteRow={handleDeleteRow}
        />
      )}

      <div className="flex justify-center gap-4 py-5">
        <Button size="lg" className="text-lg" onClick={() => setOpen(true)}>
          <Sparkles />
          {isSuccessfulGeneration ? "Re-Generate" : "Generate"}
        </Button>
        {isSuccessfulGeneration ? (
          <Button
            disabled={isSaving}
            size="lg"
            className="text-lg"
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <Loader2 size={32} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={32} />
                Save
              </>
            )}
          </Button>
        ) : null}

        <LeaderboardGenerationModal
          open={open}
          setOpen={setOpen}
          setIsSuccessfulGeneration={setIsSuccessfulGeneration}
          setGeneratedData={setGeneratedData}
        />
      </div>
    </div>
  );
}
