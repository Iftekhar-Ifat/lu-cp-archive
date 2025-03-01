"use client";

import { Edit, Trash2 } from "lucide-react";
import { ContestStatus } from "../shared/contest-status";
import { Button } from "../ui/button";
import { useState } from "react";
import { ContestEditModal } from "./contest-edit-modal";
import { ContestDeleteModal } from "./contest-delete-modal";

export default function ContestCardFooter() {
  const userType = "ADMIN";
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault(), e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between w-full">
        {userType === "ADMIN" ? (
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
        ) : (
          <div />
        )}
        <ContestStatus />
      </div>
      <ContestEditModal
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
