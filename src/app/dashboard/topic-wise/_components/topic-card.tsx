"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Topic } from "@/types/types";
import React from "react";
import TopicCardFooter from "./topic-card-footer";
import { hasPermission } from "@/utils/permissions";
import { useStrictSession } from "@/hooks/use-strict-session";

export default function TopicCard({
  topic,
  approveTopicCard,
}: {
  topic: Topic;
  approveTopicCard?: boolean;
}) {
  const session = useStrictSession();

  const hasMutationPermission = hasPermission(
    session.user.user_type,
    "mutate-topic"
  );

  return (
    <Card className="flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-zinc-400">
      <CardHeader>
        <div className="flex items-start justify-between space-y-0">
          <div className="space-y-2">
            <CardTitle className="line-clamp-2 text-xl leading-tight">
              {topic.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-muted-foreground">
              {topic.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <TopicCardFooter
          topic={topic}
          topicCardMutationPermission={hasMutationPermission}
          showApproveButton={approveTopicCard ?? false}
        />
      </CardContent>
    </Card>
  );
}
