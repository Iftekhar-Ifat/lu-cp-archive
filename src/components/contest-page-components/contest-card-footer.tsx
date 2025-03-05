"use client";

import { Check, Edit, Trash2 } from "lucide-react";
import { ContestStatus } from "./contest-status";
import { Button } from "../ui/button";
import { useState } from "react";
import { ContestDeleteModal } from "./contest-delete-modal";
import { ShortContest } from "@/utils/types";
import ContestEditModal from "./contest-edit-modal";

export default function ContestCardFooter({
  contest,
  contestMutationPrivilege,
  showContestStatus,
  showApproveButton,
}: {
  contest: ShortContest;
  contestMutationPrivilege: boolean;
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
      <div className="flex w-full items-center justify-between">
        {contestMutationPrivilege && (
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
        {showContestStatus && <ContestStatus />}
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
      <ContestDeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </div>
  );
}
