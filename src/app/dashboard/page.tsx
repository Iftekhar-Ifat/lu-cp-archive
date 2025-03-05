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
    <div className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-mono text-2xl font-bold tracking-wide">
            Dashboard
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCardData.map((item, index) => (
          <Link key={index} href={item.href} className="group">
            <Card className="flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-zinc-400">
              <CardHeader>
                <div className="flex items-start justify-between space-y-0">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-lg p-2 transition-colors">
                      <item.icon className="h-full w-full text-muted-foreground" />
                    </div>
                    <CardTitle className="line-clamp-2 text-xl leading-tight">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-muted-foreground">
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
    </div>
  );
}
