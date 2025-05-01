"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CFDifficultyLevels } from "../../app/dashboard/codeforces-ladder/_components/constants";
import { getDifficultyColorWithBG } from "./cf-ladder-helper";

export default function CFDifficultySelector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty = Number(searchParams.get("difficulty"));

  const handleDifficultyChange = (level: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("difficulty", level.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-2 py-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {CFDifficultyLevels.map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                size="sm"
                onClick={() => handleDifficultyChange(level)}
                className={cn(
                  "font-mono font-bold",
                  difficulty === level ? getDifficultyColorWithBG(level) : ""
                )}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
