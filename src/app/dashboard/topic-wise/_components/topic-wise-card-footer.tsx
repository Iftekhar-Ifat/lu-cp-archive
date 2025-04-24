"use client";

import { DeleteModal } from "@/components/shared/delete-modal";
import { Button } from "@/components/ui/button";
import { deleteTopicWiseCardMock } from "@/utils/helper";
import type { TopicWiseCard } from "@/types/types";
import { Check, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import TopicEditModal from "./topic-edit-modal";
import { cn } from "@/lib/utils";

export default function TopicWiseCardFooter({
  topic,
  topicCardMutationPermission,
  showApproveButton,
}: {
  topic: TopicWiseCard;
  topicCardMutationPermission: boolean;
  showApproveButton: boolean;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Crucial for prevent bubbling, because parent <a> is default.
      }}
    >
      <div
        className={cn(
          "flex w-full items-center",
          topicCardMutationPermission ? "justify-between" : "justify-end"
        )}
      >
        {topicCardMutationPermission && (
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(true);
              }}
              className="mr-2"
            >
              <Trash2 className="text-red-500" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault(); // Crucial for preventing url change
                setIsEditModalOpen(true);
              }}
            >
              <Edit className="text-muted-foreground" size={20} />
            </Button>
          </div>
        )}
        {showApproveButton && (
          <Button variant="outline">
            Approve
            <Check className="text-green-500" size={20} />
          </Button>
        )}
      </div>
      <TopicEditModal
        topic={topic}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        itemType="Topic"
        actionFunction={() => deleteTopicWiseCardMock(topic.id)}
      />
    </div>
  );
}
