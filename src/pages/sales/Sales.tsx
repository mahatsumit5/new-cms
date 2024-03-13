import TotalSalesChart from "./TotalSalesChart";

export default function Sales() {
  return (
    <div className="h-fit grid col-span-1 gap-5">
      <div className="w-full sm:mx-auto sm:w-5/6 bg-white rounded-2xl sm:p-10 min-h-96 dark:bg-black/10">
        <TotalSalesChart />
      </div>
      <div className="rounded-lg bg-white sm:w-5/6 mx-auto min-h-96 dark:bg-black/10 p-5 w-full">
        Tablel
      </div>
    </div>
  );
}
