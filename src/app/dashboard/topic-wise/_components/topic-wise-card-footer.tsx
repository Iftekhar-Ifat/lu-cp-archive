"use client";

import { Button } from "@/components/ui/button";
import type { TopicWiseCard } from "@/utils/types";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TopicWiseCardFooter({
  topic,
  topicCardMutationPrivilege,
}: {
  topic: TopicWiseCard;
  topicCardMutationPrivilege: boolean;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault(), e.stopPropagation();
      }}
    >
      <div className="flex w-full items-center justify-between">
        {topicCardMutationPrivilege && (
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDeleteModalOpen(true)}
              className="mr-2"
            >
              <Trash2 className="text-red-500" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="text-muted-foreground" size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
