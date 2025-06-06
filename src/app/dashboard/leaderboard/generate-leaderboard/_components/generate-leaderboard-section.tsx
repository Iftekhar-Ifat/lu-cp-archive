"use client";

import { useState } from "react";
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
    adjustment: 0,
    total_points: 1250,
  },
  {
    user: { id: "2", name: "Bob Smith", user_name: "bobsmith" },
    rank: 2,
    generated_point: 1180,
    adjustment: 0,
    total_points: 1180,
  },
  {
    user: { id: "3", name: "Charlie Brown", user_name: "charlieb" },
    rank: 3,
    generated_point: 1150,
    adjustment: 0,
    total_points: 1150,
  },
  {
    user: { id: "4", name: "Diana Ross", user_name: "dianaross" },
    rank: 4,
    generated_point: 1100,
    adjustment: 0,
    total_points: 1100,
  },
  {
    user: { id: "5", name: "Eve Wilson", user_name: "evew" },
    rank: 5,
    generated_point: 1050,
    adjustment: 0,
    total_points: 1050,
  },
  {
    user: { id: "6", name: "Frank Miller", user_name: "frankm" },
    rank: 6,
    generated_point: 980,
    adjustment: 0,
    total_points: 980,
  },
];

export default function GenerateLeaderboardSection() {
  const [open, setOpen] = useState(false);
  const [isSuccessfulGeneration, setIsSuccessfulGeneration] = useState(false);
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [generatedData] = useState<GeneratedLeaderboard[]>(initialMockData);

  const handleAdjustmentChange = (userId: string, value: string) => {
    if (value === "") {
      setAdjustments((prev) => {
        const newAdjustments = { ...prev };
        delete newAdjustments[userId];
        return newAdjustments;
      });
    } else {
      const numValue = Number.parseInt(value) || 0;
      setAdjustments((prev) => ({
        ...prev,
        [userId]: numValue,
      }));
    }
  };

  // Apply adjustments to the base data
  const updatedData = generatedData.map((entry) => {
    const adjustment = adjustments[entry.user.id] ?? 0;
    const total_points = entry.generated_point + adjustment;
    return {
      ...entry,
      adjustment,
      total_points,
    };
  });

  const handleSave = () => {
    console.log("Saving updated leaderboard:", updatedData);
  };

  return (
    <div>
      {isSuccessfulGeneration && (
        <GeneratedLeaderboardTable
          adjustments={adjustments}
          data={updatedData}
          onAdjustmentChange={handleAdjustmentChange}
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
