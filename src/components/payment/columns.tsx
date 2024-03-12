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
import { AppDispatch } from "@/store";
import { openDialog } from "@/redux/dialog.slice";
import EditPayment from "./EditPayment";
import DeletePayment from "./DeletePayment";

export function getpaymentColumns(dispatch: AppDispatch) {
  function handleOnClick(
    _id: string,
    type: "edit" | "delete",
    title?: string,
    description?: string,
    status?: "inactive" | "active"
  ) {
    switch (type) {
      case "edit":
        return dispatch(
          openDialog({
            buttonName: "Edit",
            isOpen: true,
            title: "Edit payment",
            children: (
              <EditPayment
                _id={_id}
                description={description}
                status={status}
                title={title}
              />
            ),
          })
        );
      case "delete":
        return dispatch(
          openDialog({
            buttonName: "Delete",
            isOpen: true,
            title: "Delete Payment",
            children: <DeletePayment _id={_id} />,
          })
        );
    }
  }
  const columns: ColumnDef<IPayment>[] = [
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
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
      header: () => "Action", // Hide the header for this column

      id: "_id",
      enableHiding: false,
      cell: ({ row }) => {
        const _id: string = row.getValue("_id");
        const title: string = row.getValue("title");
        const description: string = row.getValue("description");
        const status: "inactive" | "active" = row.getValue("status");
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
                  handleOnClick(_id, "edit", title, description, status);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleOnClick(_id, "delete");
                }}
              >
                Delete payment Method
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns as ColumnDef<IPayment>[];
}
