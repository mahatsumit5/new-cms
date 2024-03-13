import { Checkbox } from "@/components/ui/checkbox";

import {
  Address,
  Buyer,
  IOrder,
  TotalDetails,
  Tstatus,
  statusColor,
} from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { formatPriceToAud } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AppDispatch } from "@/store";
import { openDialog } from "@/redux/dialog.slice";
import { EditOrder } from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
import ViewDetails from "./ViewDetails";

export const getOrderColumns = (dispatch: AppDispatch) => {
  function handleOnActionItems(
    _id: string,
    actionType: "edit" | "delete" | "view",
    status: string,
    order?: IOrder
  ) {
    switch (actionType) {
      case "edit":
        return dispatch(
          openDialog({
            buttonName: "Edit",
            children: <EditOrder _id={_id} status={status} />,

            isOpen: true,
            title: "Edit Order",
          })
        );
      case "delete":
        return dispatch(
          openDialog({
            buttonName: "Delete",
            isOpen: true,
            title: "Delete",
            children: <DeleteOrder _id={_id} />,
          })
        );
      case "view":
        return dispatch(
          openDialog({
            buttonName: "View",
            isOpen: true,
            title: "Order Details",
            children: <ViewDetails order={order as IOrder} />,
          })
        );
    }
  }
  const columns: ColumnDef<IOrder>[] = [
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
        const status: Tstatus = row.getValue("status") as Tstatus;
        return (
          <div className="capitalize w-full">
            <span
              className={`p-3 text-sm  rounded-full text-white shadow-xl  min-w-fit ${statusColor[status]}
                `}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "buyer",
      id: "name",
      header: () => {
        return <div>Name</div>;
      },
      cell: ({ row }: { row: Row<IOrder> }) => {
        const buyer = row.getValue("email") as Buyer;
        return (
          <div className="flex flex-col">
            <span className="uppercase ">
              {buyer?.firstName}&nbsp;
              {buyer?.lastName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "buyer",
      id: "email",
      header: () => {
        return <div>Email</div>;
      },
      cell: ({ row }: { row: Row<IOrder> }) => {
        const buyer = row.getValue("email") as Buyer;
        return (
          <div className="flex flex-col">
            <span className="lowercase text-sm">{buyer?.email}</span>
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
      accessorKey: "SubTotal",
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
      accessorKey: "Amount_total",
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
    {
      accessorKey: "_id",
      header: () => <span>Action</span>,

      cell: ({ row }) => {
        const order: IOrder = row.original;
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
                  handleOnActionItems(order._id, "view", order.status, order);
                }}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleOnActionItems(order._id, "edit", order.status);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleOnActionItems(order._id, "delete", order.status);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns as ColumnDef<IOrder>[];
};
