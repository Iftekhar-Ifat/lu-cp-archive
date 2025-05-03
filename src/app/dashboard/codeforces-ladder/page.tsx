import { notFound } from "next/navigation";
import CFSelectDifficultySection from "./_components/cf-select-difficulty-section";
import { Separator } from "@/components/ui/separator";
import CFProblemTableSection from "./_components/cf-problem-table-section";
import CFProblemSubmitApproveSection from "./_components/cf-problem-submit-approve-section";
import { CFDifficultyLevelsSchema } from "@/utils/schema/cf-problem";

type Props = {
  searchParams: {
    difficulty?: string;
  };
};

export default async function CodeforcesLadder({ searchParams }: Props) {
  const result = CFDifficultyLevelsSchema.safeParse(searchParams);
  if (!result.success) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Codeforces Ladder
          </span>
        </div>
        <CFProblemSubmitApproveSection
          difficultyLevel={result.data.difficulty}
        />
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
