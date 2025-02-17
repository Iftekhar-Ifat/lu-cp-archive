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

export default function ContestCard({ item }: { item: any }) {
  return (
    <Card className="h-full flex flex-col justify-between transition-all duration-300 cursor-pointer hover:border-zinc-400">
      <CardHeader>
        <div className="flex items-start justify-between space-y-0">
          <CardTitle className="max-w-[90%] text-xl leading-tight line-clamp-1">
            {item.title}
          </CardTitle>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-primary"
            size={20}
          />
        </div>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {item.description}
        </CardDescription>
        <div className="pointer-events-none">
          <DifficultyBadge difficulty={item.difficulty} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground mr-1">Added by:</span>
          <Badge
            variant="secondary"
            className="text-xs w-fit px-2 truncate max-w-full hover:scale-[1.02]"
          >
            @{item.added_by}
          </Badge>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground mr-1">Tags:</span>
          {item.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="text-xs px-2 py-0 mr-1"
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
