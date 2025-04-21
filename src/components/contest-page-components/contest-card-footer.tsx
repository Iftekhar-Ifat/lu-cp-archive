"use client";

import { Check, Edit, Trash2 } from "lucide-react";
import { ContestStatus } from "./contest-status";
import { Button } from "../ui/button";
import { useState } from "react";
import ContestEditModal from "./contest-edit-modal";
import { DeleteModal } from "../shared/delete-modal";
import { cn } from "@/lib/utils";
import { type Contest } from "@/types/types";
import { deleteContest } from "@/app/dashboard/(contests)/contest-actions";

export default function ContestCardFooter({
  contest,
  contestMutationPermission,
  showContestStatus,
  showApproveButton,
}: {
  contest: Contest;
  contestMutationPermission: boolean;
  showContestStatus: boolean;
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
      <div
        className={cn(
          "flex w-full items-center",
          contestMutationPermission ? "justify-between" : "justify-end"
        )}
      >
        {contestMutationPermission && (
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
        {showContestStatus && (
          <ContestStatus
            contestId={contest.id}
            contestStatus={contest.status}
          />
        )}
        {showApproveButton && (
          <Button variant="outline">
            Approve
            <Check className="text-green-500" size={20} />
          </Button>
        )}
      </div>
      <ContestEditModal
        contest={contest}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        itemType="contest"
        actionFunction={() => deleteContest(contest.id)}
        revalidateKey={contest.type}
      />
    </div>
  );
}
