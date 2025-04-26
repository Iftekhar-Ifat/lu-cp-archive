"use client";

import ProblemAddModal from "@/components/topic-cards/problem-add-modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/user-provider";
import { hasPermission } from "@/utils/permissions";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

export default function ProblemAddApproveSection() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState(false);

  if (!user) {
    redirect("/");
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-problem");

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddProblemModalOpen(true)}>
        <Plus />
        Submit Problem
      </Button>
      {hasApprovePermission && (
        <Button variant="outline" asChild>
          <Link href={`${pathname}/approve-problem`}>
            <Check />
            Approve Problem
          </Link>
        </Button>
      )}
      <ProblemAddModal
        isOpen={isAddProblemModalOpen}
        setIsOpen={setIsAddProblemModalOpen}
      />
    </div>
  );
}
