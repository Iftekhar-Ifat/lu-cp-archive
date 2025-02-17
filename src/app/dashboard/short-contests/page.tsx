import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DifficultyBadge from "@/components/shared/difficulty-badge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

import Link from "next/link";
import React from "react";

export default function ShortContestPage() {
  const shortContestData = [
    {
      title: "Topic Wise",
      description: "Practice Topic wise problems",
      href: "dashboard/topic-wise",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "Easy",
      tags: ["Array", "String", "Math", "DP"],
    },
    {
      title: "Codeforces Ladder",
      description: "Practice Codeforces problem by difficulty level",
      href: "dashboard/codeforces-ladder",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "Easy",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title: "Leaderboard",
      description: "Leaderboard of LU's competitive programers",
      href: "dashboard/leaderboard",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "Easy",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title: "Intra LU Contest",
      description: "Problems from previous onsite LU contests",
      href: "dashboard/intra-lu-contests",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "Easy",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
    {
      title: "LU Problem Solver Short Contest",
      description: "Short Contests organized by LU Problem Solvers",
      href: "dashboard/short-contests",
      added_by: "Dewan Abdul Mohaimin Chowdhury",
      difficulty: "Easy",
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
      difficulty: "Easy",
      tags: ["Array", "String", "Math", "DP", "Greedy", "Graph", "Tree"],
    },
  ];
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-wide font-mono">
            LUPS Short Contests
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shortContestData.map((item, index) => (
          <Link key={index} href={item.href} className="group">
            <Card className="h-full flex flex-col justify-between transition-all duration-300 cursor-pointer hover:border-zinc-400">
              <CardHeader>
                <div className="flex items-start justify-between space-y-0">
                  <CardTitle className="max-w-[90%] text-xl leading-tight line-clamp-1">
                    {item.title}
                  </CardTitle>
                  <ArrowUpRight
                    className="text-muted-foreground group-hover:text-primary"
                    size={20}
                  />
                </div>

                <CardDescription className="text-muted-foreground line-clamp-2">
                  {item.description}
                </CardDescription>
                <div className="pointer-events-none">
                  <DifficultyBadge difficulty={item.difficulty} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground mr-1">
                      Added by:
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-xs w-fit truncate max-w-full"
                    >
                      {item.added_by}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground mr-1">
                      Tags:
                    </span>
                    {item.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs px-2 py-0 mr-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shortContestData.map((item, index) => (
          <Link key={index} href={item.href} className="grid">
            <Card className="transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:border-zinc-400">
              <CardHeader>
                <div className="flex items-start justify-between space-y-0">
                  <div className="space-y-2">
                    <div className="pointer-events-none">
                      <DifficultyBadge difficulty="Easy" />
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </div>
                  <ArrowUpRight className="text-muted-foreground" size="25" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.added_by}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div> */
}
