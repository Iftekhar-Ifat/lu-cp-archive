import AdministrativeTableWrapper from "@/components/profile/user-management/administrative-table-wrapper";
import StepDown from "@/components/profile/user-management/step-down";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UserManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded bg-accent p-2">
              <UserCog className="h-6 w-6" />
            </div>
            <CardTitle className="flex gap-2 text-xl">
              User Management
            </CardTitle>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
            asChild
          >
            <Link href="/dashboard/manage-users">
              Manage Others
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <CardDescription>Manage users in the system</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <StepDown />
        <AdministrativeTableWrapper />
      </CardContent>
    </Card>
  );
}
