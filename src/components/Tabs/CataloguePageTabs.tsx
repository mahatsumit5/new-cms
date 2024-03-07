import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCategoryForm from "../category/AddCategoryForm";
import { CategoryTable } from "../category/CatagoryTable";

export function CatalogueTabs() {
  return (
    <Tabs defaultValue="catalogues" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="catalogues">Catalogues</TabsTrigger>
        <TabsTrigger value="add-catalogue">Add new Catalogues</TabsTrigger>
      </TabsList>
      <TabsContent value="catalogues">
        <CategoryTable />
      </TabsContent>
      <TabsContent
        value="add-catalogue"
        className="md:w-1/2 mx-auto w-full md:mt-10 shadow-lg p-5 rounded bg-slate-500/30"
      >
        <AddCategoryForm />
      </TabsContent>
    </Tabs>
  );
}
