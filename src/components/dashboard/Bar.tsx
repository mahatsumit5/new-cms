import { useAppSelector } from "@/hooks";
import { Chart as ChartJS, BarElement, CategoryScale, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, Title);
function BarGraph() {
  const { orderStatuscount } = useAppSelector((store) => store.chartData);
  return (
    <Bar
      data={{
        labels: orderStatuscount.map((item) => item._id),
        datasets: [
          {
            label: "OrderStatus",
            data: orderStatuscount.map((item) => item.count),
            backgroundColor: orderStatuscount.map(() => {
              return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
                Math.random() * 255
              )}, ${Math.ceil(Math.random() * 255)}, 0.5)`;
            }),
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
            text: "Number of order based on their status",
            fullSize: true,
            color: "white",
          },
        },
      }}
    />
  );
}

export default BarGraph;
