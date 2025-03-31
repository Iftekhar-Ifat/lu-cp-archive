"use client";

import { DeleteModal } from "@/components/shared/delete-modal";
import { Button } from "@/components/ui/button";
import { deleteTopicWiseCardMock } from "@/utils/helper";
import type { TopicWiseCard } from "@/utils/types";
import { Check, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import TopicEditModal from "./topic-edit-modal";

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
        e.preventDefault(), e.stopPropagation();
      }}
    >
      <div className="flex w-full items-center justify-between">
        {topicCardMutationPermission && (
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
        itemType={topic.name}
        actionFunction={() => deleteTopicWiseCardMock(topic.id)}
      />
    </div>
  );
}
