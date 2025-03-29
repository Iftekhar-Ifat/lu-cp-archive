import ApproveContestCardSection from "@/app/dashboard/(contests)/approve-contests/[contest]/_components/approve-contest-card-section";
import { formatLastPathSegment } from "@/utils/helper";
import { type ContestType } from "@/utils/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type ApproveContestProps = {
  params: { contest: string };
};

const contest_prefix = [
  "intra-lu-contests",
  "marathon-contests",
  "short-contests",
];

export default async function ApproveContest({ params }: ApproveContestProps) {
  // This might change if dynamic contests are required or number of contest increases
  if (!contest_prefix.includes(params.contest)) {
    notFound();
  }

  const contest_type = formatLastPathSegment(params.contest);

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Approve {contest_type}
          </span>
        </div>
      </div>

      <Suspense fallback={"Loading ..."}>
        <ApproveContestCardSection
          contestType={params.contest as ContestType}
        />
      </Suspense>
    </div>
  );
}
