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

const problemSolverData = [
  {
    title: "Topic Wise",
    description: "Practice Topic wise problems",
    icon: FileCheck,
  },
  {
    title: "Codeforces Ladder",
    description: "Practice Codeforces problem by difficulty level",
    icon: LineChart,
  },
  {
    title: "Leaderboard",
    description: "Leaderboard of LU's competitive programers",
    icon: Trophy,
  },
  {
    title: "Intra LU Contest",
    description: "Problems from previous onsite LU contests",
    icon: Users,
  },
  {
    title: "LU Problemsolver Short Contest",
    description: "Short Contests organized by LU Problem Solvers",
    icon: Timer,
  },
  {
    title: "LU Problemsolver Marathon Contest",
    description: "Long Contests organized by LU Problem Solvers",
    icon: Hourglass,
  },
  {
    title: "User Guide",
    description: "Check how to get the most out of LUCA",
    icon: BookUser,
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
        {problemSolverData.map((item, index) => (
          <Card
            key={index}
            className="transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <CardHeader>
              <div className="flex items-start justify-between space-y-0">
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-lg p-2 transition-colors">
                    <item.icon className="w-full h-full text-muted-foreground" />
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
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
