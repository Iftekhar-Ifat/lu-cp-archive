import Link from "next/link";
import ContestCard from "../contest-page-components/contest-card";
import { Contest } from "@/utils/types";

export default async function MarathonContestCardSection() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const marathonContestData: Contest[] = [
    {
      id: "1",
      name: "Topic Wise",
      description: "Practice Topic wise problems",
      link: "dashboard/topic-wise",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "EASY",
      tags: ["array", "string", "math", "dp"],
    },
    {
      id: "2",
      name: "Codeforces Ladder",
      description: "Practice Codeforces problem by difficulty level",
      link: "dashboard/codeforces-ladder",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "EASY",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      id: "3",
      name: "Leaderboard",
      description: "Leaderboard of LU's competitive programers",
      link: "dashboard/leaderboard",
      added_by: "Iftekhar-Ifat",
      difficulty: "EASY",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      id: "4",
      name: "Intra LU Contest",
      description: "Problems from previous onsite LU contests",
      link: "dashboard/intra-lu-contests",
      added_by: "Iftekhar-Ifat",
      difficulty: "HARD",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      id: "5",
      name: "LU Problem Solver Short Contest",
      description: "Short Contests organized by LU Problem Solvers",
      link: "dashboard/short-contests",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "MEDIUM",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      id: "6",
      name: "LU Problem Solver Marathon Contest lorem ipsum dolor sit amet LU Problem Solver Marathon Contest lorem ipsum dolor sit amet",
      description:
        "LU Problem Solver Marathon Contest lorem ipsum dolor sit amet LU Problem Solver Marathon Contest lorem ipsum dolor sit amet Long Contests organized by LU Problem Solvers",
      link: "dashboard/marathon-contests",
      added_by:
        "Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury Dewan Abdul Mohaimin Chowdhury",
      difficulty: "EASY",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {marathonContestData.map((contest) => (
        <Link key={contest.id} href={contest.link} className="group">
          <ContestCard contest={contest} approveContestCard={false} />
        </Link>
      ))}
    </div>
  );
}
