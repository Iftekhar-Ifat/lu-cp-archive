"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Sparkles } from "lucide-react";
import LeaderboardGenerationModal from "@/components/generate-leaderboard/leaderboard-generation-modal";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";
import GeneratedLeaderboardTable from "@/components/generate-leaderboard/generated-leaderboard-table/generated-leaderboard-table";

const initialMockData: GeneratedLeaderboard[] = [
  {
    user: { id: "1", name: "Alice Johnson", user_name: "alicej" },
    rank: 1,
    generated_point: 1250,
    additional_points: 0,
    total_points: 1250,
  },
  {
    user: { id: "2", name: "Bob Smith", user_name: "bobsmith" },
    rank: 2,
    generated_point: 1180,
    additional_points: 0,
    total_points: 1180,
  },
  {
    user: { id: "3", name: "Charlie Brown", user_name: "charlieb" },
    rank: 3,
    generated_point: 1150,
    additional_points: 0,
    total_points: 1150,
  },
  {
    user: { id: "4", name: "Diana Ross", user_name: "dianaross" },
    rank: 4,
    generated_point: 1100,
    additional_points: 0,
    total_points: 1100,
  },
  {
    user: { id: "5", name: "Eve Wilson", user_name: "evew" },
    rank: 5,
    generated_point: 1050,
    additional_points: 0,
    total_points: 1050,
  },
  {
    user: { id: "6", name: "Frank Miller", user_name: "frankm" },
    rank: 6,
    generated_point: 980,
    additional_points: 0,
    total_points: 980,
  },
];

export default function GenerateLeaderboardSection() {
  const [open, setOpen] = useState(false);
  const [isSuccessfulGeneration, setIsSuccessfulGeneration] = useState(false);
  const [additional_points, setAdditionalPoints] = useState<
    Record<string, number>
  >({});
  const [generatedData, setGeneratedData] =
    useState<GeneratedLeaderboard[]>(initialMockData);

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
  const updatedData = useMemo(() => {
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

  const handleSave = () => {
    console.log("Saving updated leaderboard:", updatedData);
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
          <Button size="lg" className="text-lg" onClick={handleSave}>
            <Save size={32} />
            Save
          </Button>
        ) : null}

        <LeaderboardGenerationModal
          open={open}
          setOpen={setOpen}
          setIsSuccessfulGeneration={setIsSuccessfulGeneration}
        />
      </div>
    </div>
  );
}
