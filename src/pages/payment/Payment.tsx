import { CustomTabs } from "@/components/Tabs/CustomTabs";
import { useAppSelector } from "@/hooks";

const Payment = () => {
  const { payment } = useAppSelector((s) => s.payments);
  return (
    <div className="min-h-screen">
      <CustomTabs
        type="payment"
        tab1="Payment Options "
        tab2="Add new payment method"
        data={payment}
        children={<>To do implement payment form</>}
      />
    </div>
  );
};

export default Payment;
