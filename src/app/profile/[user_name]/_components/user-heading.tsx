"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type USER_TYPE } from "@/types/types";
import { type users } from "@prisma/client";
import { User } from "lucide-react";

export default function UserHeading({ userData }: { userData: users }) {
  const getUserTypeColor = (userType: USER_TYPE) =>
    (
      ({
        ADMIN: "bg-red-500/20 text-rose-500",
        POWER: "bg-cyan-500/20 text-sky-500",
        STANDARD: "bg-green-500/20 text-emerald-500",
      }) as const
    )[userType];

  return (
    <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userData.image ?? undefined} />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="font-mono text-2xl font-bold tracking-wide">
            {userData.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">@{userData.user_name}</Badge>
            <Badge
              className={`pointer-events-none ${getUserTypeColor(userData.user_type)}`}
            >
              {userData.user_type}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
