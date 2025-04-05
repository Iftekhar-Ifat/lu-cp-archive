"use client";

import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import ContestAddModal from "./contest-add-modal";
import { useUser } from "../user-provider";
import { redirect, usePathname } from "next/navigation";
import { hasPermission } from "@/utils/permissions";

export default function ContestAddApproveSection() {
  const { user } = useUser();
  const pathname = usePathname().split("/").pop();
  const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);

  if (!user) {
    return redirect("/");
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-contest");

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddContestModalOpen(true)}>
        <Plus />
        Add Contest
      </Button>
      {hasApprovePermission && (
        <Button variant="outline" asChild>
          <Link href={`/dashboard/approve-contests/${pathname}`}>
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
