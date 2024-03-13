import { CustomTable } from "@/components/ReuseableComponents/Customtable";
import { useAppSelector } from "@/hooks";
import { IOrder } from "@/types";

const Orders = () => {
  const { orders } = useAppSelector((store) => store.orderData);
  return (
    <div className="min-h-screen md:p-4">
      <CustomTable data={orders as IOrder[]} type="order" />
    </div>
  );
};

export default Orders;
