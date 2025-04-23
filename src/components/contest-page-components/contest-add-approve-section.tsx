"use client";

import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import ContestAddModal from "./contest-add-modal";
import { useUser } from "../user-provider";
import { redirect, usePathname } from "next/navigation";
import { hasPermission } from "@/utils/permissions";
import { Badge } from "../ui/badge";
import { type ContestType } from "@/types/types";

export default function ContestAddApproveSection({
  contestType,
}: {
  contestType: ContestType;
}) {
  const { user } = useUser();
  const pathname = usePathname().split("/").pop();
  const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);

  const count = 5;

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
        <Button variant="outline" asChild className="relative">
          <Link href={`/dashboard/approve-contests/${pathname}`}>
            <Check />
            Approve Contest
            {count > 0 && (
              <Badge className="pointer-events-none absolute -top-2 left-full min-w-5 -translate-x-1/2 justify-center bg-green-100 px-1 text-sm text-emerald-500 dark:bg-green-500/20">
                {count > 99 ? "99+" : count}
              </Badge>
            )}
          </Link>
        </Button>
      )}
      <ContestAddModal
        isOpen={isAddContestModalOpen}
        setIsOpen={setIsAddContestModalOpen}
        contestType={contestType}
      />
    </div>
  );
}
