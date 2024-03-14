import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Key, Tableprops, columnDef } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCategoryColumns } from "../category/columns";
import { getProductColumn } from "../products/columns";
import { getOrderColumns } from "../order/columns";
import { getpaymentColumns } from "../payment/columns";
import { getFrequentlyBoughtColumns } from "@/pages/dashboard/frequenltyBought.column";

export function CustomTable({ data, type }: Tableprops) {
  const { isOpen } = useAppSelector((store) => store.sideBar);
  const dispatch = useAppDispatch();
  const columns: Record<Key, columnDef> = {
    catagory: getCategoryColumns(dispatch),
    product: getProductColumn(dispatch),
    order: getOrderColumns(dispatch),
    payment: getpaymentColumns(dispatch),
    frequenltyBought: getFrequentlyBoughtColumns(),
  };
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data as [],
    columns: columns[type] as [],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const dataForFilter = {
    order: type === "order" ? table.getColumn("email") : null,
    catagory: type === "catagory" ? table.getColumn("title") : null,
    product: type === "product" ? table.getColumn("slug") : null,
    payment: type === "payment" ? table.getColumn("title") : null,
  };
  const tableDesign = `  ${
    type === "product"
      ? ` ${
          isOpen
            ? "md:max-w-[480px]  um:max-w-[550px] lg:max-w-3xl xl:max-w-[1000px]  2xl:max-w-full"
            : "md:max-w-[640px] um:max-w-[700px] lg:max-w-[900px] xl:max-w-[1150px] 2xl:max-w-full"
        }    mx-auto`
      : "w-full"
  }`;
  return (
    <div className={tableDesign}>
      <div className="flex my-4 ">
        {type !== "frequenltyBought" ? (
          <Input
            placeholder={`Search ${type}`}
            value={(dataForFilter[type]?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              dataForFilter[type]?.setFilterValue(event.target.value)
            }
            className="max-w-sm dark:bg-slate-500 bg-slate-200"
          />
        ) : (
          <p className="text-md bg-purple-500 dark:bg-purple-900 p-2 px-6 text-white rounded-lg">
            Frequently Bought Items
          </p>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border  ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
