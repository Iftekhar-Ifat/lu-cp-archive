"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { type users } from "@prisma/client";
import UserTypeBadge from "@/components/shared/user-type-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { type USER_TYPE } from "@/types/types";
import { changeUserType } from "@/app/profile/[user_name]/profile-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import { useQueryClient } from "@tanstack/react-query";

export const standard_users_table_columns: ColumnDef<users>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "user_name",
    header: "User Name",
    cell: ({ row }) => {
      return (
        <Link href={`/profile/@${row.original.user_name}`}>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{row.original.user_name}
          </Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: "user_type",
    header: "User Type",
    cell: ({ row }) => {
      return <UserTypeBadge user_type={row.original.user_type} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => {
      const selectedUser = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient();

      const handleChangeUserType = async (newType: USER_TYPE) => {
        const userId = selectedUser.id;
        toast.promise(
          async () => {
            const actionResult = await changeUserType({ userId, newType });
            const result = unwrapActionResult(actionResult);
            queryClient.invalidateQueries({
              queryKey: ["standard-users"],
            });
            return result;
          },
          {
            loading: (
              <>
                Changing to <UserTypeBadge user_type={newType} />
              </>
            ),
            success: (
              <>
                User is now <UserTypeBadge user_type={newType} />
              </>
            ),
            error: "Failed to change user type",
          }
        );
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {selectedUser.user_type !== "ADMIN" && (
              <DropdownMenuItem onClick={() => handleChangeUserType("ADMIN")}>
                Make <UserTypeBadge user_type="ADMIN" />
              </DropdownMenuItem>
            )}
            {selectedUser.user_type !== "POWER" && (
              <DropdownMenuItem onClick={() => handleChangeUserType("POWER")}>
                Make <UserTypeBadge user_type="POWER" />
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => handleChangeUserType("STANDARD")}>
              Make <UserTypeBadge user_type="STANDARD" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
