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

interface AdministrativeUsersTableProps<TData, Tvalue> {
  columns: ColumnDef<TData, Tvalue>[];
  data: TData[];
  totalSlots: number;
  userType: USER_TYPE;
}

export function AdministrativeUsersTable<TValue>({
  columns,
  data,
  totalSlots,
  userType,
}: AdministrativeUsersTableProps<users, TValue>) {
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

  const emptyRows = Math.max(0, totalSlots - data.length);

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

          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`}>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="text-center italic text-muted-foreground"
              >
                Slot is available
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
