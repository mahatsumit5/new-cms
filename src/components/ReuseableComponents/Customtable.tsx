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
import { IPayment, IProduct, Key, Tableprops, columnDef } from "@/types";
import { useAppDispatch } from "@/hooks";
import { getCategoryColumns } from "../category/columns";
import { getProductColumn } from "../products/columns";
import { getOrderColumns } from "../order/columns";
import { getpaymentColumns } from "../payment/columns";
import { getFrequentlyBoughtColumns } from "@/pages/dashboard/frequenltyBought.column";
import { toast } from "sonner";
import { deletePaymentAction } from "@/Action/paymentAction";
import { deleteCatagoryAction } from "@/Action/catelogueAction";
import { deleteProductAction } from "@/Action/productAction";
import { deleteorderAction } from "@/Action/orderAction";

export function CustomTable({ data, type }: Tableprops) {
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

  async function handleDelete() {
    const datatoDelete = table.getFilteredSelectedRowModel().rows;
    if (datatoDelete.length) {
      datatoDelete.map(async (data) => {
        const { _id }: IPayment | IProduct = data.original;
        switch (type) {
          case "payment":
            return dispatch(deletePaymentAction({ _id: _id }));
          case "catagory":
            return dispatch(deleteCatagoryAction(_id));
          case "product":
            return dispatch(deleteProductAction(_id));
          case "order":
            return dispatch(deleteorderAction(_id));
        }
      });
    } else {
      toast.info("Please select items to delete.");
    }
  }
  return (
    <div className={"w-full mt-10 md:px-2"}>
      <div className="flex  flex-col md:flex-row justify-between gap-5">
        {type !== "frequenltyBought" ? (
          <Input
            placeholder={`Search ${type}`}
            value={(dataForFilter[type]?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              dataForFilter[type]?.setFilterValue(event.target.value)
            }
            className="max-w-sm component-background  focus:outline-none"
          />
        ) : (
          <p className="text-md font-embed text-xl text-center bg-primary/50 p-2 px-6 text-primary-foreground rounded-lg">
            Frequently Bought Items
          </p>
        )}
        {/* <Calendar /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className=" bg-primary/70 text-white">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="component-background">
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
      <div className="rounded-md  border-slate-300 border dark:border-slate-600 p-2 mt-10">
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
            className="component-background"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="component-background"
          >
            Next
          </Button>
        </div>
      </div>
      <Button variant={"destructive"} onClick={handleDelete} className=" mt-7">
        Delete selected {type}
      </Button>
    </div>
  );
}
