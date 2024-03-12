import { EditPaymentProps } from "@/types";
import { PaymentForm } from "./PaymentForm";

const EditPayment = ({ status, _id, description, title }: EditPaymentProps) => {
  return (
    <div>
      <PaymentForm
        _id={_id}
        description={description}
        status={status}
        title={title}
      />
    </div>
  );
};

export default EditPayment;
