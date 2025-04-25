import ContestSubmitApproveSection from "@/components/contest-page-components/contest-submit-approve-section";
import { ContestTypeSchema, type ContestType } from "@/types/types";
import { notFound } from "next/navigation";
import { formatContestTypeTitle, hyphenToUnderscore } from "@/utils/helper";
import ContestCardSection from "./_components/contest-card-section";

type ContestPageProps = {
  params: { contest: string };
};

export default function ContestPage({ params }: ContestPageProps) {
  // This might change if dynamic contests are required or number of contest increases
  const formattedSlug = hyphenToUnderscore(params.contest);

  if (ContestTypeSchema.safeParse(formattedSlug).error) {
    notFound();
  }

  const contestName = formatContestTypeTitle(formattedSlug);

  return (
    <div className="py-8">
      <div className="mb-4 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            {contestName}
          </span>
        </div>
        <ContestSubmitApproveSection
          contestType={formattedSlug as ContestType}
        />
      </div>
      <ContestCardSection contestType={formattedSlug as ContestType} />
    </div>
  );
}
