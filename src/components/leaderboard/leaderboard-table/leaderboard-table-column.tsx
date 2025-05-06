import { Badge } from "@/components/ui/badge";
import { type Leaderboard } from "@/utils/schema/leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const leaderboard_table_column: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      return <div className="font-mono font-medium">{row.original.rank}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return <div>{user.name}</div>;
    },
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <Link href={`/profile/@${user.user_name}`}>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{user.user_name}
          </Badge>
        </Link>
      );
    },
  },
  {
    id: "points",
    header: "Points",
    cell: ({ row }) => {
      return <div className="font-mono font-medium">{row.original.points}</div>;
    },
  },
];
