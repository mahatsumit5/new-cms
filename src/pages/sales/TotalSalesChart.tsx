import { useAppSelector } from "@/hooks";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
export default function TotalSalesChart() {
  const { totalSales } = useAppSelector((store) => store.chartData);

  const labels = totalSales.map((item) => {
    return new Date(item._id).toDateString();
  });
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: "Total sales by Date",
            data: totalSales.map((item) => item.totalSales),

            borderColor: "rgb(75, 192, 192)",
            tension: 0.8,
            backgroundColor: "black",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Total number of sales by date",
          },
        },
      }}
    />
  );
}
