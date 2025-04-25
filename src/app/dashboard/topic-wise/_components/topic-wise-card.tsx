"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/components/user-provider";
import { type TopicWiseCard } from "@/types/types";
import React from "react";
import TopicWiseCardFooter from "./topic-wise-card-footer";
import { redirect } from "next/navigation";
import { hasPermission } from "@/utils/permissions";

export default function TopicWiseCard({
  topic,
  approveTopicCard,
}: {
  topic: TopicWiseCard;
  approveTopicCard?: boolean;
}) {
  const { user } = useUser();

  if (!user) {
    redirect("/");
  }

  const hasMutationPermission = hasPermission(user.user_type, "mutate-topic");

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
        <TopicWiseCardFooter
          topic={topic}
          topicCardMutationPermission={hasMutationPermission}
          showApproveButton={approveTopicCard ?? false}
        />
      </CardContent>
    </Card>
  );
}
