"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import DifficultyBadge from "../shared/difficulty-badge";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { type Problem } from "@/types/types";
import ProblemCardFooter from "./problem-card-footer";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { hasPermission } from "@/utils/permissions";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProblemCard({
  problem,
  approveContestCard,
}: {
  problem: Problem;
  approveContestCard?: boolean;
}) {
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }

  const hasMutationPermission = hasPermission(
    session.user.user_type,
    "mutate-problem"
  );

  return (
    <Card
      className={cn(
        "flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:border-zinc-400",
        "[&[data-card-border='SKIPPED']]:border-rose-500",
        "[&[data-card-border='InProgress']]:border-amber-500",
        "[&[data-card-border='DONE']]:border-emerald-500"
      )}
      data-card
      data-card-border={problem.status || undefined}
    >
      <CardHeader>
        <div className="flex items-start justify-between space-y-0">
          <CardTitle className="line-clamp-1 max-w-[90%] text-xl leading-tight">
            {problem.title}
          </CardTitle>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-primary"
            size={20}
          />
        </div>
        <CardDescription className="line-clamp-2 text-muted-foreground">
          {problem.description}
        </CardDescription>
        <div className="pointer-events-none">
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <span className="mr-1 text-xs text-muted-foreground">Added by:</span>
          <Link href={`/profile/@${problem.added_by}`}>
            <Badge
              variant="secondary"
              className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
            >
              @{problem.added_by}
            </Badge>
          </Link>
        </div>
        <div className="space-y-1">
          <span className="mr-1 text-xs text-muted-foreground">Tags:</span>
          {problem.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="mr-1 px-2 py-0 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Separator />
        <ProblemCardFooter
          problem={problem}
          problemMutationPermission={hasMutationPermission}
          showProblemStatus={!approveContestCard}
          showApproveButton={approveContestCard ?? false}
        />
      </CardContent>
    </Card>
  );
}
