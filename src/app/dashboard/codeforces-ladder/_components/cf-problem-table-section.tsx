"use client";

import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDifficultyColor } from "@/components/codeforces-ladder/cf-ladder-helper";
import CFProblemTableWrapper from "../../../../components/codeforces-ladder/cf-problem-table/cf-problem-table-wrapper";
import { useSearchParams } from "next/navigation";

export default function CFProblemTableSection() {
  const searchParams = useSearchParams();
  const difficultyLevel = Number(searchParams.get("difficulty"));

  return (
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
      <CFProblemTableWrapper difficultyLevel={difficultyLevel} />
    </div>
  );
}
