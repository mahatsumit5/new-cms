import { Button } from "@/components/ui/button";
import { formatPriceToAud } from "@/lib/utils";
import { IFrequentlyBoughtItem } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export const getFrequentlyBoughtColumns = () => {
  // Columns
  const columns: ColumnDef<IFrequentlyBoughtItem>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title: string = row.getValue("title");
        return <div className="capitalize w-full">{title}</div>;
      },
    },

    {
      accessorKey: "thumbnail",
      header: "Image",
      cell: ({ row }) => <img src={row.getValue("thumbnail")} width={100} />,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price: number = row.getValue("price");
        return (
          <div className="bg-white  rounded dark:bg-slate-500 min-w-32 max-w-32 text-center p-3">
            {formatPriceToAud(price)}
          </div>
        );
      },
    },
    {
      accessorKey: "count",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Count
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const count: number = row.getValue("count");
        return (
          <div className="bg-white  rounded dark:bg-slate-500 min-w-32 max-w-32 text-center p-3">
            {count} times
          </div>
        );
      },
    },
  ];
  return columns as ColumnDef<IFrequentlyBoughtItem>[];
};
