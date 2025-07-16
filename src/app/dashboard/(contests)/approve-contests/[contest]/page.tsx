import { formatContestTypeTitle, hyphenToUnderscore } from "@/utils/helper";
import { hasPermission } from "@/utils/permissions";
import { type ContestType } from "@prisma/client";
import { notFound } from "next/navigation";
import ApproveContestCardSection from "./_components/approve-contest-card-section";
import { ContestTypeSchema } from "@/types/types";
import { auth } from "@/lib/auth";

type ApproveContestProps = {
  params: { contest: string };
};

export default async function ApproveContest({ params }: ApproveContestProps) {
  // This might change if dynamic contests are required or number of contest increases

  const formattedSlug = hyphenToUnderscore(params.contest);

  if (ContestTypeSchema.safeParse(formattedSlug).error) {
    notFound();
  }

  const session = await auth();

  if (!session || !hasPermission(session.user.user_type, "approve-contest")) {
    notFound();
  }

  const contestName = formatContestTypeTitle(formattedSlug);

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Approve {contestName}
          </span>
        </div>
      </div>
      <ApproveContestCardSection contestType={formattedSlug as ContestType} />
    </div>
  );
}
