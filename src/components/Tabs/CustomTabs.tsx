import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ICategory,
  IPayment,
  IProduct,
  ITabsProps,
  TDataForTabs,
  TabsKey,
} from "@/types";
import { CustomTable } from "../ReuseableComponents/Customtable";

export function CustomTabs({ type, tab1, children, tab2, data }: ITabsProps) {
  const renderItems: Record<TabsKey, TDataForTabs> = {
    catagory: type === "catagory" ? (data as ICategory[]) : [],
    payment: type === "payment" ? (data as IPayment[]) : [],
    product: type === "product" ? (data as IProduct[]) : [],
  };

  return (
    <Tabs defaultValue={tab1} className="md:px-2">
      <TabsList className="grid   grid-cols-2 mx-auto bg-primary text-secondary dark:text-white ">
        <TabsTrigger value={tab1} className="">
          {tab1}
        </TabsTrigger>
        <TabsTrigger value={tab2}>{tab2}</TabsTrigger>
      </TabsList>
      <TabsContent value={tab1} className=" ">
        <CustomTable type={type} data={renderItems[type]} />
      </TabsContent>
      <TabsContent value={tab2}>
        <div className="flex justify-end">{children}</div>
      </TabsContent>
    </Tabs>
  );
}
