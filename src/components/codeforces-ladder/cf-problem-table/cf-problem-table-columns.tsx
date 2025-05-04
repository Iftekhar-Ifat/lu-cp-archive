import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { type CFProblem } from "@/types/types";
import { getDifficultyColorWithBG } from "../cf-ladder-helper";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";

export const cf_problem_columns: ColumnDef<CFProblem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const problem = row.original;
      return (
        <Link href={problem.url} target="_blank" className="font-medium">
          {problem.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      return <div className="font-bold">{row.original.difficulty_level}</div>;
    },
  },
  {
    accessorKey: "addedBy",
    header: "Added By",
    cell: ({ row }) => {
      return (
        <Link href={`/profile/@${row.original.added_by}`}>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{row.original.added_by}
          </Badge>
        </Link>
      );
    },
  },
];

export const approve_cf_problem_columns: ColumnDef<CFProblem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const problem = row.original;
      return (
        <Link href={problem.url} target="_blank" className="font-medium">
          {problem.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      return (
        <Badge
          className={`pointer-events-none ${getDifficultyColorWithBG(row.original.difficulty_level)}`}
        >
          {row.original.difficulty_level}
        </Badge>
      );
    },
  },
  {
    accessorKey: "addedBy",
    header: "Submitted By",
    cell: ({ row }) => {
      return (
        <Link href={`/profile/@${row.original.added_by}`}>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{row.original.added_by}
          </Badge>
        </Link>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const problem = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => console.log("Delete", problem)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => console.log("Edit", problem)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => console.log("Approve", problem)}
          >
            <Check className="h-4 w-4 text-green-500" />
          </Button>
        </div>
      );
    },
  },
];
