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
        tab2="Add new payment method"
        data={payment}
        children={
          <div className="mx-auto md:w-1/3 my-16 p-3 bg-white/70 rounded-lg shadow-2xl dark:bg-black/35">
            <PaymentForm />
          </div>
        }
      />
    </div>
  );
};

export default Payment;
