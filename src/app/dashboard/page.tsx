import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileCheck,
  LineChart,
  Trophy,
  Users,
  Timer,
  Hourglass,
  ArrowUpRight,
  BookUser,
} from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

const dashboardCardData = [
  {
    title: "Topic Wise",
    description: "Practice Topic wise problems",
    icon: FileCheck,
    href: "dashboard/topic-wise",
  },
  {
    title: "Codeforces Ladder",
    description: "Practice Codeforces problem by difficulty level",
    icon: LineChart,
    href: "dashboard/codeforces-ladder",
  },
  {
    title: "Leaderboard",
    description: "Leaderboard of LU's competitive programers",
    icon: Trophy,
    href: "dashboard/leaderboard",
  },
  {
    title: "Intra LU Contest",
    description: "Problems from previous onsite LU contests",
    icon: Users,
    href: "dashboard/intra-lu-contests",
  },
  {
    title: "LU Problem Solver Short Contest",
    description: "Short Contests organized by LU Problem Solvers",
    icon: Timer,
    href: "dashboard/short-contests",
  },
  {
    title: "LU Problem Solver Marathon Contest",
    description: "Long Contests organized by LU Problem Solvers",
    icon: Hourglass,
    href: "dashboard/marathon-contests",
  },
  {
    title: "User Guide",
    description: "Check how to get the most out of LUCA",
    icon: BookUser,
    href: "dashboard/user-guide",
  },
];

export default function Dashboard() {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-wide font-mono">
            Dashboard
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCardData.map((item, index) => (
          <Link key={index} href={item.href} className="group">
            <Card className="h-full flex flex-col justify-between transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-zinc-400">
              <CardHeader>
                <div className="flex items-start justify-between space-y-0">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-lg p-2 transition-colors">
                      <item.icon className="w-full h-full text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl leading-tight line-clamp-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </div>
                  <ArrowUpRight
                    className="text-muted-foreground group-hover:text-primary"
                    size="25"
                  />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
