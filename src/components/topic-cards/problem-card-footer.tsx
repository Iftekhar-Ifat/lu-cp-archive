"use client";

import { Check, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { type Problem } from "@/types/types";
import { deleteContestMock } from "@/utils/helper";
import { DeleteModal } from "../shared/delete-modal";
import { ProblemStatus } from "./problem-status";
import ProblemEditModal from "./problem-edit-modal";
import { cn } from "@/lib/utils";

export default function ProblemCardFooter({
  problem,
  problemMutationPermission,
  showProblemStatus,
  showApproveButton,
}: {
  problem: Problem;
  problemMutationPermission: boolean;
  showProblemStatus: boolean;
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
          problemMutationPermission ? "justify-between" : "justify-end"
        )}
      >
        {problemMutationPermission && (
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
        {showProblemStatus && <ProblemStatus />}
        {showApproveButton && (
          <Button variant="outline">
            Approve
            <Check className="text-green-500" size={20} />
          </Button>
        )}
      </div>
      <ProblemEditModal
        problem={problem}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        itemType="problem"
        actionFunction={() => deleteContestMock(problem.id)}
      />
    </div>
  );
}
