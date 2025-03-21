import ContestAddApproveSection from "@/components/contest-page-components/contest-add-approve-section";
import MarathonContestCardSection from "./_components/marathon-contest-card-section";

export default function MarathonContestPage() {
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            LUPS Marathon Contests
          </span>
        </div>
        <ContestAddApproveSection />
      </div>
      <MarathonContestCardSection />
    </div>
  );
}
