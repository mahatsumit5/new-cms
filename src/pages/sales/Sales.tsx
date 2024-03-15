import TotalSalesChart from "./TotalSalesChart";

export default function Sales() {
  return (
    <div className="h-fit grid col-span-1 gap-5">
      <div className="w-full   bg-white rounded-2xl flex justify-center min-h-96 dark:bg-[#014e8660]">
        <TotalSalesChart />
      </div>
      <div className="rounded-lg bg-white mx-auto min-h-96  dark:bg-[#014e8660] p-5 w-full">
        Tablel
      </div>
    </div>
  );
}
