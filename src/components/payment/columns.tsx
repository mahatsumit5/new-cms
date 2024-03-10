import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPayment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
export const columns: ColumnDef<IPayment>[] = [
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
        <div className="capitalize">
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("description")}
        </div>
      );
    },
  },

  {
    accessorKey: "_id",
    header: () => null, // Hide the header for this column

    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const _id: string = row.getValue("_id");
      console.log(_id);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                localStorage.setItem("_id", _id as string);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete payment Method</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
