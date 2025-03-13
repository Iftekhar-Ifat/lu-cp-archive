"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/components/user-provider";
import { type TopicWiseCard } from "@/utils/types";
import React from "react";
import TopicWiseCardFooter from "./topic-wise-card-footer";

export default function TopicWiseCard({ topic }: { topic: TopicWiseCard }) {
  const { user } = useUser();
  return (
    <Card className="flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-zinc-400">
      <CardHeader>
        <div className="flex items-start justify-between space-y-0">
          <div className="space-y-2">
            <CardTitle className="line-clamp-2 text-xl leading-tight">
              {topic.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-muted-foreground">
              {topic.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="self-end">
        <TopicWiseCardFooter
          topic={topic}
          topicCardMutationPrivilege={user?.userType !== "STANDARD"}
        />
      </CardFooter>
    </Card>
  );
}
