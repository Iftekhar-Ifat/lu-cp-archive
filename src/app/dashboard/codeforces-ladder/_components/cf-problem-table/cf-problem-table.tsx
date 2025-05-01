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

interface DataTableProps<TData extends CFProblem, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// 🧪 Mock solved checker with delay
async function mockCheckSolvedProblems(
  problems: CFProblem[]
): Promise<Set<string>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate some problems being solved
      const solvedIds = new Set<string>(
        problems.filter((_, idx) => idx % 2 === 0).map((p) => p.id)
      );
      resolve(solvedIds);
    }, 1500); // simulate 1.5s delay
  });
}

export function CFProblemTable<TValue>({
  columns,
  data,
}: DataTableProps<CFProblem, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate API fetch
    mockCheckSolvedProblems(data).then(setSolvedProblems);
  }, [data]);

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
