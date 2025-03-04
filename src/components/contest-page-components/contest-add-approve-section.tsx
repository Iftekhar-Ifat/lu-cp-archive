"use client";

import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import AddContestModal from "../shared/add-contest-modal";
import { useState } from "react";
import Link from "next/link";

export default function ContestAddApproveSection() {
  const userType = "ADMIN";
  const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddContestModalOpen(true)}>
        <Plus />
        Add Contest
      </Button>
      {userType === "ADMIN" && (
        <Button variant="outline" asChild>
          <Link href="/dashboard/short-contests/approve-short-contest">
            <Check />
            Approve Contest
          </Link>
        </Button>
      )}
      <AddContestModal
        isOpen={isAddContestModalOpen}
        setIsOpen={setIsAddContestModalOpen}
      />
    </div>
  );
}
