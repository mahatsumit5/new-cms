import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { ProductDataTable } from "../products/CustomTable";
// import { columns } from "../products/columns";
import NewProductForm from "../products/NewProductForm";

export function CustomTabs() {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="add-product">Add new Products</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        {/* <ProductDataTable
          columns={columns}
          data={[
            {
              id: "728ed52f",
              amount: 100,
              status: "pending",
              email: "m@example.com",
            },
          ]}
        /> */}
      </TabsContent>
      <TabsContent value="add-product">
        <NewProductForm />
      </TabsContent>
    </Tabs>
  );
}
