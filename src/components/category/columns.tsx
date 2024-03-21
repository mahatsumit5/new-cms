import { Checkbox } from "@/components/ui/checkbox";

import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { AppDispatch } from "@/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { openDialog } from "@/redux/dialog.slice";
import EditCatagoryForm from "./EditCategoryForm";
import { deleteCatagoryAction } from "@/Action/catelogueAction";

export const getCategoryColumns = (dispatch: AppDispatch) => {
  //handle on delete
  function handleOnDelete(_id: string) {
    dispatch(deleteCatagoryAction(_id));
  }

  function handleOnClick(category: ICategory, type: "edit" | "delete") {
    switch (type) {
      case "edit":
        return dispatch(
          openDialog({
            buttonName: "Edit",
            isOpen: true,
            title: "Edit Catagory",
            children: <EditCatagoryForm category={category} />,
          })
        );
      case "delete":
        return dispatch(
          openDialog({
            buttonName: "Delete",
            isOpen: true,
            title: "Delete Catagory",
            children: (
              <div className="flex flex-col gap-2">
                <span className="text-xl">
                  Are you sure want to delete this catalogue?
                </span>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
                <div className="flex w-full justify-end">
                  <Button
                    className=""
                    variant={"destructive"}
                    onClick={() => {
                      handleOnDelete(category._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ),
          })
        );
    }
  }

  // Columns
  const columns: ColumnDef<ICategory>[] = [
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
          <div className="capitalize w-full">
            <span
              className={`p-2 text-sm  rounded-full text-white shadow-xl ${
                status === "active" ? " bg-active " : "bg-inactive"
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
      header: "Title",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => <img src={row.getValue("image")} width={100} />,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="bg-white  rounded dark:bg-slate-500 min-w-32 max-w-32 text-center p-3">
            {date.toDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "_id",
      header: "Action",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <>
            {" "}
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
                    handleOnClick(category, "edit");
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleOnClick(category, "delete");
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
  return columns as ColumnDef<ICategory>[];
};
