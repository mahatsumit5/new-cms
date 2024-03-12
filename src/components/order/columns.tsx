import { Checkbox } from "@/components/ui/checkbox";

import { Address, IOrder, TotalDetails } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatPriceToAud } from "@/lib/utils";
export const columns: ColumnDef<IOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: "active" | "inactive" = row.getValue("status");
      return (
        <div className="capitalize w-auto">
          <span
            className={`p-2 text-sm  rounded-full text-white shadow-xl ${
              status === "active" ? " bg-green-600 " : "bg-red-700"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => {
      return <div>Address</div>;
    },
    cell: ({ row }: { row: Row<IOrder> }) => {
      const address = row.getValue("address") as Address;
      return (
        <div className="uppercase text-sm w-auto">
          {address.line1}-{address.country}
        </div>
      );
    },
  },

  {
    accessorKey: "total_details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Shipping Cost
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total_details: TotalDetails = row.getValue("total_details");
      return (
        <div className="text-left font-medium">
          {formatPriceToAud(total_details.amount_shipping)}
        </div>
      );
    },
  },
  {
    accessorKey: "total_details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SubTotal
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total_details: TotalDetails = row.getValue("total_details");
      return (
        <div className="text-left font-medium">
          {formatPriceToAud(total_details.amount_subtotal)}
        </div>
      );
    },
  },
  {
    accessorKey: "total_details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total_details: TotalDetails = row.getValue("total_details");
      return (
        <div className="text-left font-medium">
          {formatPriceToAud(total_details.amount_total)}
        </div>
      );
    },
  },

  // {
  //   accessorKey: "_id",
  //   header: () => null, // Hide the header for this column

  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const _id: string = row.getValue("_id");
  //     console.log(_id);
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>

  //           <DropdownMenuItem
  //             onClick={() => {
  //               localStorage.setItem("_id", _id as string);
  //             }}
  //           >
  //             Edit
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>Delete payment Method</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
