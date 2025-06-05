"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Sparkles } from "lucide-react";
import LeaderboardGenerationModal from "@/components/generate-leaderboard/leaderboard-generation-modal";
import { generated_leaderboard_column } from "@/components/generate-leaderboard/generated-leaderboard-columns";
import { GeneratedLeaderboardTable } from "@/components/generate-leaderboard/generated-leaderboard-table/generated-leaderboard-table";

const data = [
  {
    user: {
      id: "cmavfp45b00012c0w7ec2h4li",
      name: "Iftekhar Ahmed",
      user_name: "Iftekhar-Ifat",
    },
    rank: 1,
    generated_point: 196,
  },
  {
    user: {
      id: "cmavfg47300002c0wjl7cv9ps",
      name: "Shakib Absar",
      user_name: "sabsar42",
    },
    rank: 2,
    generated_point: 187,
  },
];

export default function GenerateLeaderboardSection() {
  const [open, setOpen] = useState(false);
  const [isSuccessfulGeneration, setIsSuccessfulGeneration] = useState(false);
  return (
    <div>
      {isSuccessfulGeneration && (
        <GeneratedLeaderboardTable
          columns={generated_leaderboard_column}
          data={data}
        />
      )}

      <div className="flex justify-center gap-4 py-5">
        <Button size="lg" className="text-lg" onClick={() => setOpen(true)}>
          <Sparkles />
          {isSuccessfulGeneration ? "Re-Generate" : "Generate"}
        </Button>
        <Button
          size="lg"
          className="text-lg"
          onClick={() => console.log("saved")}
        >
          <Save size={32} />
          Save
        </Button>

        <LeaderboardGenerationModal
          open={open}
          setOpen={setOpen}
          setIsSuccessfulGeneration={setIsSuccessfulGeneration}
        />
      </div>
    </div>
  );
}
