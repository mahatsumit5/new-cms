import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ICategory, IPayment, IProduct, ITabsProps } from "@/types";
import { CustomTable } from "../ReuseableComponents/Customtable";

export function CustomTabs({ type, tab1, children, tab2, data }: ITabsProps) {
  return (
    <Tabs defaultValue={tab1} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={tab1}>{tab1}</TabsTrigger>
        <TabsTrigger value={tab2}>{tab2}</TabsTrigger>
      </TabsList>
      <TabsContent value={tab1}>
        {type === "catagory" && (
          <CustomTable data={data as ICategory[]} type="catagory" />
        )}

        {type === "product" && (
          <CustomTable data={data as IProduct[]} type="product" />
        )}
        {type === "payment" && (
          <CustomTable data={data as IPayment[]} type="payment" />
        )}
      </TabsContent>
      <TabsContent value={tab2}>
        {" "}
        <div className=" w-full  mx-auto p-5 bg-white/50 dark:bg-slate-950/25 rounded-lg">
          {children}
        </div>
      </TabsContent>
    </Tabs>
  );
}
