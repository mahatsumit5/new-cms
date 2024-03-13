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
export default function LineChart() {
  const { orderSaleQtybyDate } = useAppSelector((store) => store.chartData);
  const labels = orderSaleQtybyDate.map((item) => {
    return new Date(item._id).toLocaleDateString();
  });
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: "Order sales by Date",
            data: orderSaleQtybyDate.map((item) => item.count),

            borderColor: "rgb(75, 192, 192)",
            tension: 0.5,
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
            text: "Total sales by date",
          },
        },
      }}
    />
  );
}
