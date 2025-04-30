"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "lucide-react";
import type { ReactNode } from "react";

type StatItemProps = {
  label: string;
  value: ReactNode;
};

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="space-y-2 rounded-lg bg-muted/60 p-3 transition-all duration-200 hover:bg-muted/80">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div>{value}</div>
    </div>
  );
}

export default function ActivityStats() {
  const problemsSolved = 2;
  const totalProblems = 100;

  const contestSolved = 7;
  const totalContest = 100;

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded bg-accent p-2">
            <Activity className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Activity Stats
          </CardTitle>
        </div>
        <CardDescription className="text-sm">
          Your overall contribution and activity stats
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatItem
            label="Problem Added"
            value={
              <p className="font-mono text-3xl font-semibold tracking-tight">
                0
              </p>
            }
          />
          <StatItem
            label="Contest Added"
            value={
              <p className="font-mono text-3xl font-semibold tracking-tight">
                0
              </p>
            }
          />
          <StatItem
            label="Problem Solved"
            value={
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-semibold tracking-tight">
                  {problemsSolved}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  /{totalProblems}
                </span>
              </div>
            }
          />
          <StatItem
            label="Contest Solved"
            value={
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-semibold tracking-tight">
                  {contestSolved}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  /{totalContest}
                </span>
              </div>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
