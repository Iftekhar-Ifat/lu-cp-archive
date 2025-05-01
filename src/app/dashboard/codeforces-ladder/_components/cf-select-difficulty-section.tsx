"use client";

import CFDifficultySelector from "./cf-difficulty-selector";
import { Terminal } from "lucide-react";
import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";
import { cn } from "@/lib/utils";
import { getDifficultyColor } from "./cf-ladder-helper";
import CFProblemTableSection from "./cf-problem-table-section";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function CFSelectDifficultySection() {
  const searchParams = useSearchParams();
  const difficultyLevel = Number(searchParams.get("difficulty"));

  return (
    <div>
      <Separator />
      <div className="mb-8 mt-4">
        <div className="mb-4 flex gap-2 text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <Terminal />
          Select Difficulty
        </div>
        <ExpandableWrapper>
          <CFDifficultySelector />
        </ExpandableWrapper>
      </div>
      <Separator />
      <div className="my-4">
        <div className="mb-4 flex items-center gap-2 text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <Terminal />
          <span>Problems</span>
          <span>of</span>
          <code
            className={cn(
              "rounded bg-muted px-[0.3rem] py-[0.2rem] font-semibold",
              getDifficultyColor(difficultyLevel)
            )}
          >
            {difficultyLevel}
          </code>
        </div>
        <CFProblemTableSection difficultyLevel={difficultyLevel} />
      </div>
    </div>
  );
}
