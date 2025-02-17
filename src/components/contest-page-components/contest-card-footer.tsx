"use client";

import { Edit2 } from "lucide-react";
import { ContestStatus } from "../shared/contest-status";
import { Button } from "../ui/button";

export default function ContestCardFooter() {
  const userType = "ADMIN";
  return (
    <div
      onClick={(e) => {
        e.preventDefault(), e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between w-full">
        {userType === "ADMIN" ? (
          <Button variant="outline" size="icon">
            <Edit2 className="text-muted-foreground" size={20} />
          </Button>
        ) : (
          <div />
        )}
        <ContestStatus />
      </div>
    </div>
  );
}
