import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ICategory, ITabsProps } from "@/types";
import { CategoryTable } from "../category/CatagoryTable";

export function CustomTabs({ type, tab1, children, tab2, data }: ITabsProps) {
  return (
    <Tabs defaultValue={tab1} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={tab1}>{tab1}</TabsTrigger>
        <TabsTrigger value={tab2}>{tab2}</TabsTrigger>
      </TabsList>
      <TabsContent value={tab1}>
        {type === "catagory" && (
          <CategoryTable catalogue={data as ICategory[]} />
        )}

        {type === "product" && <>Todo show products data table</>}
      </TabsContent>
      <TabsContent value={tab2}>{children}</TabsContent>
    </Tabs>
  );
}
