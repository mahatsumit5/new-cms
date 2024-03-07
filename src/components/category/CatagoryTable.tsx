import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useAppSelector } from "@/hooks";
import { CatagoryDialog } from "./AddCategoryDialog";
import EditCatagoryForm from "./EditCategoryForm";

export function CategoryTable() {
  const { catalogue } = useAppSelector((store) => store.catagoryInfo);
  return (
    <Table>
      <TableCaption>A list of your categories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="">Image</TableHead>
          <TableHead className="">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {catalogue.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <span
                className={`p-4  rounded-lg text-white  uppercase  ${
                  item.status === "active" ? "bg-green-700" : "bg-red-500"
                }`}
              >
                {item.status}
              </span>
            </TableCell>
            <TableCell>
              {" "}
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
            </TableCell>
            <TableCell className="text-right">
              <img src={item.image} alt={item.title} height={125} width={125} />
            </TableCell>
            <TableCell className="flex flex-col gap-5">
              <CatagoryDialog buttonName="Edit" title="Edit catagory">
                <EditCatagoryForm category={item} />
              </CatagoryDialog>

              <Button className="w-full" variant={"destructive"}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <Button className="w-full">Delete</Button> */}
      </TableFooter>
    </Table>
  );
}
