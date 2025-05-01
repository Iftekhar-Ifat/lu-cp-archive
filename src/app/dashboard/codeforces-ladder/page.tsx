import { notFound } from "next/navigation";
import CFSelectDifficultySection from "./_components/cf-select-difficulty-section";
import { CFDifficultyLevelsSchema } from "./_components/constants";
import { Separator } from "@/components/ui/separator";
import CFProblemTableSection from "./_components/cf-problem-table-section";

type Props = {
  searchParams: {
    difficulty?: string;
  };
};

export default function CodeforcesLadder({ searchParams }: Props) {
  const result = CFDifficultyLevelsSchema.safeParse(searchParams);
  if (!result.success) {
    return notFound();
  }
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Codeforces Ladder
          </span>
        </div>
      </div>
      <div>
        <Separator />
        <CFSelectDifficultySection />
        <Separator />
        <CFProblemTableSection />
      </div>
    </div>
  );
}
