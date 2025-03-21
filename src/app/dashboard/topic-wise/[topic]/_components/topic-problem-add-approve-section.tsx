"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/components/user-provider";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function TopicProblemAddApproveSection() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddContestModalOpen(true)}>
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
      {/* <ContestAddModal
        isOpen={isAddContestModalOpen}
        setIsOpen={setIsAddContestModalOpen}
      /> */}
    </div>
  );
}

/* import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import ContestAddModal from "./contest-add-modal";
import { useUser } from "../user-provider";
import { usePathname } from "next/navigation";

export default function ContestAddApproveSection() {

}

 */
