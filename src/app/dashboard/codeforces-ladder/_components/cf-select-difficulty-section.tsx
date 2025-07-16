"use client";

import CFDifficultySelector from "../../../../components/codeforces-ladder/cf-difficulty-selector";
import { Terminal } from "lucide-react";
import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";

export default function CFSelectDifficultySection() {
  return (
    <div>
      <div className="mb-8 mt-4">
        <div className="mb-4 flex gap-2 text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <Terminal />
          Select Difficulty
        </div>
        <ExpandableWrapper>
          <CFDifficultySelector />
        </ExpandableWrapper>
      </div>
    </div>
  );
}
