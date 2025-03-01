import React from "react";
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
import { ShortContest } from "@/utils/types";

export default function ContestCard({ item }: { item: ShortContest }) {
  return (
    <Card className="flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:border-zinc-400">
      <CardHeader>
        <div className="flex items-start justify-between space-y-0">
          <CardTitle className="line-clamp-1 max-w-[90%] text-xl leading-tight">
            {item.title}
          </CardTitle>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-primary"
            size={20}
          />
        </div>
        <CardDescription className="line-clamp-2 text-muted-foreground">
          {item.description}
        </CardDescription>
        <div className="pointer-events-none">
          <DifficultyBadge difficulty={item.difficulty} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <span className="mr-1 text-xs text-muted-foreground">Added by:</span>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{item.added_by}
          </Badge>
        </div>
        <div className="space-y-1">
          <span className="mr-1 text-xs text-muted-foreground">Tags:</span>
          {item.tags.map((tag, tagIndex) => (
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
        <ContestCardFooter />
      </CardContent>
    </Card>
  );
}
