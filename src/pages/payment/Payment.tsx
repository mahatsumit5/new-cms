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
        children={
          <div className="w-full flex justify-between gap-2 mt-10">
            <div className="hidden md:block w-1/2 mt-5 rounded-md">
              <img src="/stripe.svg" className="h-full w-full object-cover " />
            </div>
            <PaymentForm />
          </div>
        }
      />
    </div>
  );
};

export default Payment;
