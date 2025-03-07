import ApproveContestCardSection from "@/components/contest-page-components/approve-contest-card-section";
import { Suspense } from "react";

export default async function ApproveIntraLUContest() {
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Approve Intra LU Contests
          </span>
        </div>
      </div>

      <Suspense fallback={"Loading ..."}>
        <ApproveContestCardSection />
      </Suspense>
    </div>
  );
}
