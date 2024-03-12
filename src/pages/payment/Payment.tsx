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
          <div className="mx-auto md:w-1/2 my-14 p-5 bg-slate-400/30 rounded-lg shadow-2xl">
            <PaymentForm />
          </div>
        }
      />
    </div>
  );
};

export default Payment;
