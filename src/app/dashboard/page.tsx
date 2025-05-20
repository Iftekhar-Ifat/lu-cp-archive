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
    href: "/dashboard/topic-wise",
  },
  {
    title: "Codeforces Ladder",
    description: "Practice Codeforces problem by difficulty level",
    icon: LineChart,
    href: {
      pathname: "/dashboard/codeforces-ladder",
      query: { difficulty: "800" },
    },
    prefetch: false,
  },
  {
    title: "Leaderboard",
    description: "Leaderboard of LU's competitive programers",
    icon: Trophy,
    href: { pathname: "/dashboard/leaderboard", query: { latest: "true" } },
    prefetch: false,
  },
  {
    title: "Intra LU Contests",
    description: "Problems from previous onsite LU contests",
    icon: Users,
    href: "/dashboard/intra-lu-contests",
  },
  {
    title: "Short Contests",
    description: "Short Contests organized by LU Problem Solvers",
    icon: Timer,
    href: "/dashboard/short-contests",
  },
  {
    title: "Marathon Contests",
    description: "Long Contests organized by LU Problem Solvers",
    icon: Hourglass,
    href: "/dashboard/marathon-contests",
  },
  {
    title: "User Guide",
    description: "Check how to get the most out of LUCA",
    icon: BookUser,
    href: "/user-guide",
  },
];

export default function Dashboard() {
  return (
    <div className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-2xl font-bold tracking-wide">
          Dashboard
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCardData.map(
          ({ title, description, icon: Icon, href, prefetch }, idx) => (
            <Link key={idx} href={href} prefetch={prefetch} className="group">
              <Card className="flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-zinc-400">
                <CardHeader>
                  <div className="flex items-start justify-between space-y-0">
                    <div className="space-y-2">
                      <div className="h-12 w-12 rounded-lg p-2 transition-colors">
                        <Icon className="h-full w-full text-muted-foreground" />
                      </div>
                      <CardTitle className="line-clamp-2 text-xl leading-tight">
                        {title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-muted-foreground">
                        {description}
                      </CardDescription>
                    </div>
                    <ArrowUpRight
                      size={25}
                      className="text-muted-foreground group-hover:text-primary"
                    />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
