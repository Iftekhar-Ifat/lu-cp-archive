import ContestAddApproveSection from "@/components/contest-page-components/contest-add-approve-section";
import ContestCard from "@/components/contest-page-components/contest-card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ShortContest } from "@/utils/types";
import Link from "next/link";

export default function ShortContestPage() {
  const shortContestData: ShortContest[] = [
    {
      title: "Topic Wise",
      description: "Practice Topic wise problems",
      href: "dashboard/topic-wise",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "EASY",
      tags: ["array", "string", "math", "dp"],
    },
    {
      title: "Codeforces Ladder",
      description: "Practice Codeforces problem by difficulty level",
      href: "dashboard/codeforces-ladder",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "EASY",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title: "Leaderboard",
      description: "Leaderboard of LU's competitive programers",
      href: "dashboard/leaderboard",
      added_by: "Iftekhar-Ifat",
      difficulty: "EASY",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title: "Intra LU Contest",
      description: "Problems from previous onsite LU contests",
      href: "dashboard/intra-lu-contests",
      added_by: "Iftekhar-Ifat",
      difficulty: "HARD",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title: "LU Problem Solver Short Contest",
      description: "Short Contests organized by LU Problem Solvers",
      href: "dashboard/short-contests",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "MEDIUM",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title:
        "LU Problem Solver Marathon Contest lorem ipsum dolor sit amet LU Problem Solver Marathon Contest lorem ipsum dolor sit amet",
      description:
        "LU Problem Solver Marathon Contest lorem ipsum dolor sit amet LU Problem Solver Marathon Contest lorem ipsum dolor sit amet Long Contests organized by LU Problem Solvers",
      href: "dashboard/marathon-contests",
      added_by:
        "Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury",
      difficulty: "EASY",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
  ];
  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center">
            <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
              LUPS Short Contests
            </span>
          </div>
          <ContestAddApproveSection />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shortContestData.map((item, index) => (
            <Link key={index} href={item.href} className="group">
              <ContestCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
