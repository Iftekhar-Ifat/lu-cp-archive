"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import LeaderboardGenerationModal from "@/components/generate-leaderboard/leaderboard-generation-modal";

export default function GenerateLeaderboardSection() {
  const [open, setOpen] = useState(false);
  const [isSuccessfulGeneration, setIsSuccessfulGeneration] = useState(false);
  return (
    <div>
      {isSuccessfulGeneration && <div>Table</div>}

      <div className="flex justify-center py-5">
        <Button size="lg" className="text-lg" onClick={() => setOpen(true)}>
          <Sparkles className="mr-2" />
          Generate
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
