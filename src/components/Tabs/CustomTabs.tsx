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
    <Tabs defaultValue={tab1} className="">
      <TabsList className="grid   grid-cols-2 mx-auto bg-[#61a5c2] data-[state=active]:text-black text-white component-background">
        <TabsTrigger value={tab1} className="">
          {tab1}
        </TabsTrigger>
        <TabsTrigger value={tab2}>{tab2}</TabsTrigger>
      </TabsList>
      <TabsContent value={tab1} className=" ">
        <CustomTable type={type} data={renderItems[type]} />
        {/* {type === "catagory" && (
          <CustomTable data={data as ICategory[]} type="catagory" />
        )}

        {type === "product" && (
          <CustomTable data={data as IProduct[]} type="product" />
        )}
        {type === "payment" && (
          <CustomTable data={data as IPayment[]} type="payment" />
        )} */}
      </TabsContent>
      <TabsContent value={tab2}>
        <div className="">{children}</div>
      </TabsContent>
    </Tabs>
  );
}
