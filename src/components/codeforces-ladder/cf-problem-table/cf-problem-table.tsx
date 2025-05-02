import { useEffect, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type CFProblem } from "./cf-problem-table-columns";
import { checkSolvedProblems } from "../check-problem-solved/check-solved-problems";

interface CFProblemTableProps<TData extends CFProblem, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  difficultyLevel: number;
  cf_handle: string | null;
}

export function CFProblemTable<TValue>({
  columns,
  data,
  difficultyLevel,
  cf_handle,
}: CFProblemTableProps<CFProblem, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function solvedProblemSetHandler(cf_handle: string) {
      const result = await checkSolvedProblems(
        difficultyLevel,
        data,
        cf_handle
      );
      setSolvedProblems(result);
    }
    if (cf_handle) {
      solvedProblemSetHandler(cf_handle);
    }
  }, [data, difficultyLevel, cf_handle]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const isSolved = solvedProblems.has(row.original.id);
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={isSolved ? "bg-green-500 dark:bg-green-600" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
