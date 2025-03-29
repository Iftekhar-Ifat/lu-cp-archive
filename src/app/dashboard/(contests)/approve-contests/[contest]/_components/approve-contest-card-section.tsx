import Link from "next/link";
import ContestCard from "../../../../../../components/contest-page-components/contest-card";
import { type ContestType } from "@/utils/types";
import { fetchContestData } from "@/lib/fetch";

export default async function ApproveContestCardSection({
  contestType,
}: {
  contestType: ContestType;
}) {
  const approveContestData = await fetchContestData(contestType);

  if (!approveContestData) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {approveContestData.map((contest) => (
        <Link key={contest.id} href={contest.link} className="group">
          <ContestCard contest={contest} approveContestCard={true} />
        </Link>
      ))}
    </div>
  );
}
