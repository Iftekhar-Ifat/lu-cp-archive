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
import ContestCardFooter from "./contest-card-footer";
import { type Contest } from "@/types/types";
import { useUser } from "../user-provider";
import { cn } from "@/lib/utils";
import { hasPermission } from "@/utils/permissions";
import { redirect } from "next/navigation";

export default function ContestCard({
  contest,
  approveContestCard,
}: {
  contest: Contest;
  approveContestCard?: boolean;
}) {
  const { user } = useUser();

  if (!user) {
    redirect("/");
  }

  const hasMutationPermission = hasPermission(user.user_type, "mutate-contest");

  return (
    <Card
      className={cn(
        "flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:border-zinc-400",
        "[&[data-card-border='skipped']]:border-rose-500",
        "[&[data-card-border='in_progress']]:border-amber-500",
        "[&[data-card-border='done']]:border-emerald-500"
      )}
      data-card
    >
      <CardHeader>
        <div className="flex items-start justify-between space-y-0">
          <CardTitle className="line-clamp-1 max-w-[90%] text-xl leading-tight">
            {contest.name}
          </CardTitle>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-primary"
            size={20}
          />
        </div>
        <CardDescription className="line-clamp-2 text-muted-foreground">
          {contest.description}
        </CardDescription>
        <div className="pointer-events-none">
          <DifficultyBadge difficulty={contest.difficulty} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <span className="mr-1 text-xs text-muted-foreground">Added by:</span>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{contest.added_by}
          </Badge>
        </div>
        <div className="space-y-1">
          <span className="mr-1 text-xs text-muted-foreground">Tags:</span>
          {contest.tags.map((tag, tagIndex) => (
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
        <ContestCardFooter
          contest={contest}
          contestMutationPermission={hasMutationPermission}
          showContestStatus={!approveContestCard}
          showApproveButton={approveContestCard ?? false}
        />
      </CardContent>
    </Card>
  );
}
