import { Badge } from "@/components/ui/badge";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const generated_leaderboard_column: ColumnDef<GeneratedLeaderboard>[] = [
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
    id: "generated_point",
    header: "Generated Point",
    cell: ({ row }) => {
      return (
        <div className="font-mono font-medium">
          {row.original.generated_point}
        </div>
      );
    },
  },
];
