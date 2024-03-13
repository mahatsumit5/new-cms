import { CustomTable } from "@/components/ReuseableComponents/Customtable";
import AddCategoryForm from "@/components/category/AddCategoryForm";
import BarGraph from "@/components/dashboard/Bar";
import DonoughtChart from "@/components/dashboard/Donought";
import LineChart from "@/components/dashboard/LineChart";
import PieChart from "@/components/dashboard/PieChart";
import { useAppSelector } from "@/hooks";
import { IFrequentlyBoughtItem, IPayment } from "@/types";

const Dashboard = () => {
  const { payment } = useAppSelector((store) => store.payments);
  const { orderStatuscount } = useAppSelector((store) => store.chartData);
  const { frequentlybought } = useAppSelector((store) => store.chartData);
  return (
    <div className="min-h-screen">
      <div className=" flex flex-wrap overflow-hidden justify-between sm:grid-cols-5 gap-5  p-3 ">
        {orderStatuscount.map((item) => (
          <div
            className="dashboard-card-top dark:bg-green-800 "
            key={item._id}
            style={{
              backgroundColor: `rgba(${Math.ceil(
                Math.random() * 255
              )}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
                Math.random() * 255
              )}, 0.8)`,
            }}
          >
            <p className="text-6xl bg-white rounded-full p-4 text-black">
              {item?.count}
            </p>
            <p className="uppercase">orders {item._id} </p>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-10 grid-cols-1  p-2 mt-7">
        <div className=" dashboard-card col-span-1">
          <LineChart />
        </div>
        <div className=" dashboard-card col-span-1">
          <BarGraph />
        </div>

        <div className=" dashboard-card">
          <PieChart />
        </div>
        <div className=" dashboard-card">
          <DonoughtChart />
        </div>
        <div className="col-span-1  overflow-y-auto bg-slate-100 rounded-lg p-4 dark:bg-slate-200/10">
          <CustomTable data={payment as IPayment[]} type="payment" />
        </div>
        <div className="bg-slate-100 rounded-lg p-4 dark:bg-slate-200/10">
          <AddCategoryForm />{" "}
        </div>
        <div className=" overflow-y-auto bg-slate-100 rounded-lg p-4 dark:bg-slate-200/10 col-span-1">
          <CustomTable
            data={frequentlybought as IFrequentlyBoughtItem[]}
            type="frequenltyBought"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
