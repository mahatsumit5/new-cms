import { AppDispatch } from "@/store";
import { ICategory, IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { formatPriceToAud } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { openDialog } from "@/redux/dialog.slice";
import ProductForm from "./ProductForm";
import { deleteProductAction } from "@/Action/productAction";

export const getProductColumn = (dispatch: AppDispatch) => {
  function handleDelete(productId: string) {
    dispatch(deleteProductAction(productId));
  }
  function handleOnClick(product: IProduct, type: "edit" | "delete") {
    switch (type) {
      case "edit":
        return dispatch(
          openDialog({
            buttonName: "Edit",
            isOpen: true,
            title: "Edit Product",
            children: (
              <div className="">
                <ProductForm product={product} />
              </div>
            ),
          })
        );
      case "delete":
        return dispatch(
          openDialog({
            buttonName: "Delete",
            isOpen: true,
            title: "Delete Product",
            children: (
              <div className="flex flex-col gap-2">
                <span className="text-xl">
                  Are you sure want to delete this product?
                </span>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
                <div className="flex w-full justify-end">
                  <Button
                    className=""
                    variant={"destructive"}
                    onClick={() => {
                      handleDelete(product._id);
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

  const columns: ColumnDef<IProduct>[] = [
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
                status === "active" ? " bg-[#61a5c2] " : "bg-red-700"
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
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" font-bold">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "slug",
      cell: ({ row }) => {
        return (
          <div className="text-left text-sm text-muted-foreground">
            {row.getValue("slug")}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => "Category",
      cell: ({ row }) => {
        const category: ICategory = row.getValue("category");
        return (
          <div className="text-left text-sm text-muted-foreground">
            {category.title}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => <div>Price</div>,
      cell: ({ row }) => {
        const price = row.getValue("price");
        return <div>{formatPriceToAud(price as number)}</div>;
      },
    },
    {
      accessorKey: "salesPrice",
      header: () => <div>SalesPrice</div>,
      cell: ({ row }) => {
        const salesPrice: number = row.getValue("salesPrice");
        return <div>{formatPriceToAud(salesPrice as number)}</div>;
      },
    },
    {
      accessorKey: "qty",
      header: () => <div>Quantity</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("qty")}</div>;
      },
    },
    {
      accessorKey: "color",
      header: () => <div>Color</div>,
      cell: ({ row }) => {
        const color: string[] = row.getValue("color");
        return (
          <div className="flex gap-3 flex-wrap">
            {color.map((color) => (
              <span
                key={color}
                className="p-3 rounded-full shadow-xl"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        );
      },
    },

    {
      accessorKey: "size",
      header: () => <div>Size</div>,
      cell: ({ row }) => {
        const size: string[] = row.getValue("size");
        return (
          <div className="flex gap-3 flex-wrap w-[150px]">
            {size.map((size) => (
              <span
                key={size}
                className="p-3 rounded-full text-center shadow-xl uppercase bg-slate-300"
              >
                {size}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "thumbnail",
      header: () => <div>Thumbnail</div>,
      cell: ({ row }) => {
        const thumbnail: string = row.getValue("thumbnail");
        return <img src={thumbnail} height={150} width={150} />;
      },
    },
    {
      accessorKey: "images",
      header: () => <div>Images</div>,
      cell: ({ row }) => {
        const images: string[] = row.getValue("images");
        return (
          <div className="grid grid-cols-2">
            {images.map((image) => (
              <img src={image} height={50} width={50} key={image} />
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: () => <div className="text-left">Description</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left line-clamp-4 h-20 overflow-hidden text-sm text-muted-foreground ">
            {row.getValue("description")}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-left">Created Date</div>,
      cell: ({ row }) => {
        const createdDate: Date = row.getValue("createdAt");
        return (
          <div className="text-left line-clamp-4 h-20 overflow-hidden text-sm text-muted-foreground w-[100px]">
            {new Date(createdDate).toDateString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const product: IProduct = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem onClick={() => handleOnClick(product, "edit")}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOnClick(product, "delete")}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns as ColumnDef<IProduct>[];
};
