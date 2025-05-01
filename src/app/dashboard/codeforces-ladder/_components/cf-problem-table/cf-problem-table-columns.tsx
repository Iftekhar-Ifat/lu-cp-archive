import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Define the Problem type
export type CFProblem = {
  id: string;
  name: string;
  url: string;
  difficulty: number;
  addedBy: string;
  solved?: boolean;
};

// Define the columns for the data table
export const columns: ColumnDef<CFProblem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const problem = row.original;
      return (
        <Link href={problem.url} target="_blank" className="font-medium">
          {problem.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      return <div className="font-bold">{row.original.difficulty}</div>;
    },
  },
  {
    accessorKey: "addedBy",
    header: "Added By",
    cell: ({ row }) => {
      return (
        <Link href={`/profile/@${row.original.addedBy}`}>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{row.original.addedBy}
          </Badge>
        </Link>
      );
    },
  },
];
