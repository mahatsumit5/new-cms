import { OrderTable } from "@/components/order/OrderTable";
import { useAppSelector } from "@/hooks";

const Orders = () => {
  const { orders } = useAppSelector((store) => store.orderData);
  return (
    <div className="min-h-screen p-4">
      <OrderTable data={orders} />
    </div>
  );
};

export default Orders;
