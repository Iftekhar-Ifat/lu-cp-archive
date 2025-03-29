"use client";

import ProblemAddModal from "@/components/topic-cards/problem-add-modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/user-provider";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function TopicProblemAddApproveSection() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState(false);
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddProblemModalOpen(true)}>
        <Plus />
        Add Problem
      </Button>
      {user?.userType === "ADMIN" && (
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
