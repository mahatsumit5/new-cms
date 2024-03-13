import { formatPriceToAud } from "@/lib/utils";
import { IOrder, statusColor } from "@/types";

export default function ViewDetails({ order }: { order: IOrder }) {
  return (
    <div className="grid gap-4">
      <div className="w-full flex flex-col gap-3">
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Status:
          <span
            className={`p-3 text-sm  rounded-full text-white shadow-xl  min-w-fit ${
              statusColor[order.status]
            }
                `}
          >
            {order.status}
          </span>{" "}
        </p>
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Buyer:
          <span className="text-sm text-muted-foreground">
            {order.buyer.firstName}
            &nbsp;
            {order.buyer.lastName}
          </span>
        </p>
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Email:
          <span className="text-sm text-muted-foreground ">
            {order.buyer.email}
          </span>
        </p>
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Address:
          <span className="text-sm text-muted-foreground ">
            {order.address.line1},&nbsp;
            {order.address.country}
          </span>
        </p>
      </div>

      {order.orderItems.map((product) => {
        return (
          <div key={product._id} className="flex justify-between w-full gap-5">
            <span>
              <img
                src={product.thumbnail}
                height={50}
                width={100}
                className="shadow-lg rounded-md"
              />
            </span>
            <span className="flex-1 flex flex-col gap-3">
              <p className="text-sm font-medium leading-none w-full flex justify-between">
                Title:
                <span className="text-sm text-muted-foreground">
                  {product.title}
                </span>
              </p>
              <p className="text-sm font-medium leading-none w-full flex justify-between">
                Price:
                <span className="text-sm text-muted-foreground">
                  {product.size}
                </span>
              </p>
              <p className="text-sm font-medium leading-none w-full flex justify-between">
                Price:
                <span className="text-sm text-muted-foreground">
                  {formatPriceToAud(product.price)} AUD
                </span>
              </p>
              <p className="text-sm font-medium leading-none w-full flex justify-between">
                Color:
                <span
                  className="p-2 rounded-full shadow-2xl h-5 w-5"
                  style={{
                    backgroundColor: product.color,
                  }}
                ></span>
              </p>
            </span>
          </div>
        );
      })}

      {/* total details */}

      <div className="w-full flex flex-col gap-2 ">
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Shipping Cost:
          <span className="text-sm text-muted-foreground text-right ">
            {formatPriceToAud(order.total_details.amount_shipping)}
          </span>
        </p>
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Subtotal:
          <span className="text-sm text-muted-foreground ">
            {formatPriceToAud(order.total_details.amount_subtotal)}
          </span>
        </p>
        <p className="text-sm font-medium leading-none w-full flex justify-between">
          Total Amount:
          <span className="text-sm text-muted-foreground ">
            {formatPriceToAud(order.total_details.amount_total)}
          </span>
        </p>
      </div>
    </div>
  );
}
