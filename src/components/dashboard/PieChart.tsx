import { useAppSelector } from "@/hooks";
import { changeCategoryIdToName } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function PieChart() {
  const { itemsByCategory } = useAppSelector((store) => store.chartData);
  const { catalogue } = useAppSelector((store) => store.catagoryInfo);
  const lables = changeCategoryIdToName(catalogue, itemsByCategory);
  const data = {
    labels: lables,
    datasets: [
      {
        data: itemsByCategory.map((item) => item.count),
        label: "Quantity",
        backgroundColor: itemsByCategory.map(() => {
          return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
            Math.random() * 255
          )}, ${Math.ceil(Math.random() * 255)}, 0.5)`;
        }),
        hoverBackgroundColor: itemsByCategory.map(() => {
          return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
            Math.random() * 255
          )}, ${Math.ceil(Math.random() * 255)}, 0.8)`;
        }),
      },
    ],
  };
  return (
    <div>
      <Pie
        data={data}
        options={{
          responsive: true,

          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Total items available according to their catagories",
            },
          },
        }}
      />
    </div>
  );
}
