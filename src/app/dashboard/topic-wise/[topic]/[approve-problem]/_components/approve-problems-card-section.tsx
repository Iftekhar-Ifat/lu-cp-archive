import Link from "next/link";
import { fetchProblemData } from "@/lib/fetch";
import ProblemCard from "@/components/topic-cards/problem-card";

export default async function ApproveProblemCardSection({
  problemType,
}: {
  problemType: string;
}) {
  const approveContestData = await fetchProblemData(problemType);

  if (!approveContestData) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {approveContestData.map((problem) => (
        <Link key={problem.id} href={problem.link} className="group">
          <ProblemCard problem={problem} approveContestCard={true} />
        </Link>
      ))}
    </div>
  );
}
