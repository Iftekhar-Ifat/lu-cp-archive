"use client";

import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import ContestAddModal from "./contest-add-modal";
import { useUser } from "../user-provider";

export default function ContestAddApproveSection() {
  const { user } = useUser();
  const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddContestModalOpen(true)}>
        <Plus />
        Add Contest
      </Button>
      {user?.userType === "ADMIN" && (
        <Button variant="outline" asChild>
          <Link href="/dashboard/short-contests/approve-short-contest">
            <Check />
            Approve Contest
          </Link>
        </Button>
      )}
      <ContestAddModal
        isOpen={isAddContestModalOpen}
        setIsOpen={setIsAddContestModalOpen}
      />
    </div>
  );
}
