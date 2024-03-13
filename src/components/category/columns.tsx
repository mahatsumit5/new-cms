import { Checkbox } from "@/components/ui/checkbox";

import { ICategory, Tstatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { AppDispatch } from "@/store";

export const getCategoryColumns = (dispatch: AppDispatch) => {
  console.log(dispatch);
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
        const status: Tstatus = row.getValue("status") as Tstatus;
        return (
          <div className="capitalize w-full">
            <span
              className={`p-3 text-sm  rounded-full text-white shadow-xl  min-w-fit }
                `}
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
  ];
  return columns as ColumnDef<ICategory>[];
};
