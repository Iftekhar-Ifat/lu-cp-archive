"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  type ProblemProgressStats,
  type ProblemDifficulty,
} from "@/types/types";

export default function TopicProgress({
  stats,
}: {
  stats: ProblemProgressStats[];
}) {
  const [progressValues, setProgressValues] = useState(
    stats.map(() => ({ done: 0, inProgress: 0, skipped: 0 }))
  );

  const animationRan = useRef(false);

  useEffect(() => {
    if (animationRan.current) return;

    animationRan.current = true;

    const timer = setTimeout(() => {
      setProgressValues(stats);
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once

  useEffect(() => {
    if (!animationRan.current) return;

    setProgressValues(stats);
  }, [stats]); // Run when stats change

  const getDifficultyColor = (difficulty: ProblemDifficulty) =>
    (
      ({
        EASY: "text-emerald-500",
        MEDIUM: "text-sky-500",
        HARD: "text-rose-500",
      }) as const
    )[difficulty];

  const calculatePercentage = (count: number, total: number): number => {
    return total > 0 ? (count / total) * 100 : 0;
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => {
          const donePercentage = calculatePercentage(
            progressValues[index]?.done || 0,
            stat.total
          );
          const inProgressPercentage = calculatePercentage(
            progressValues[index]?.inProgress || 0,
            stat.total
          );
          const skippedPercentage = calculatePercentage(
            progressValues[index]?.skipped || 0,
            stat.total
          );
          const difficulty = stat.difficulty;

          return (
            <Card key={`${stat.difficulty}-${index}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold ${getDifficultyColor(difficulty)}`}
                  >
                    {difficulty}
                  </span>
                  <span className="text-sm text-gray-400">
                    {stat.done + stat.inProgress + stat.skipped} / {stat.total}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Done</span>
                    <span>{Math.round(donePercentage)}%</span>
                  </div>
                  <Progress
                    value={donePercentage}
                    className="h-2 [&>div]:bg-emerald-500 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>In Progress</span>
                    <span>{Math.round(inProgressPercentage)}%</span>
                  </div>
                  <Progress
                    value={inProgressPercentage}
                    className="h-2 [&>div]:bg-amber-500 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Skipped</span>
                    <span>{Math.round(skippedPercentage)}%</span>
                  </div>
                  <Progress
                    value={skippedPercentage}
                    className="h-2 [&>div]:bg-rose-500 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out"
                  />
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="grid w-full grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-emerald-500"></div>
                    <span>Done: {stat.done}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-amber-500"></div>
                    <span>In Progress: {stat.inProgress}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-rose-500"></div>
                    <span>Skipped: {stat.skipped}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-sm bg-secondary"></div>
                    <span>
                      Remaining:{" "}
                      {stat.total -
                        (stat.done + stat.inProgress + stat.skipped)}
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
