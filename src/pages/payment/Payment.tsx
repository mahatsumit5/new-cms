import { CustomTabs } from "@/components/Tabs/CustomTabs";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { useAppSelector } from "@/hooks";

const Payment = () => {
  const { payment } = useAppSelector((s) => s.payments);
  return (
    <div className="">
      <CustomTabs
        type="payment"
        tab1="Payment Options "
        tab2="Add  payment "
        data={payment}
        children={<PaymentForm />}
      />
    </div>
  );
};

export default Payment;
