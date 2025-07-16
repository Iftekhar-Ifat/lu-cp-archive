import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type users } from "@prisma/client";
import { type USER_TYPE } from "@/types/types";
import { Fragment } from "react";
import { hasPermission } from "@/utils/permissions";

interface StandardUsersTableProps<TData, Tvalue> {
  columns: ColumnDef<TData, Tvalue>[];
  data: TData[];
  userType: USER_TYPE;
}

export function StandardUsersTable<TValue>({
  columns,
  data,
  userType,
}: StandardUsersTableProps<users, TValue>) {
  const hasChangePermission = hasPermission(userType, "mutate-user");
  const columnVisibility: VisibilityState = {
    actions: hasChangePermission,
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="rounded border">
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
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))
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
