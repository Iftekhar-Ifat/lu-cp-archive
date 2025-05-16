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

export const administrative_table_columns: ColumnDef<users>[] = [
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
            <DropdownMenuItem>
              Make <UserTypeBadge user_type="ADMIN" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Make <UserTypeBadge user_type="POWER" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Make <UserTypeBadge user_type="STANDARD" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
