import React from "react";
import { Badge } from "../ui/badge";
import { type USER_TYPE } from "@/types/types";
import { cn } from "@/lib/utils";

export default function UserTypeBadge({
  user_type,
  className,
}: {
  user_type: USER_TYPE;
  className?: string;
}) {
  const getUserTypeColor = (userType: USER_TYPE) =>
    (
      ({
        ADMIN: "bg-red-500/20 text-rose-500",
        POWER: "bg-cyan-500/20 text-sky-500",
        STANDARD: "bg-green-500/20 text-emerald-500",
      }) as const
    )[userType];

  return (
    <Badge
      className={cn(
        "pointer-events-none",
        getUserTypeColor(user_type),
        className
      )}
    >
      {user_type}
    </Badge>
  );
}
