import { useAppSelector } from "@/hooks";
import { Doughnut } from "react-chartjs-2";

function DonoughtChart() {
  const { activeAndInactivecount } = useAppSelector((store) => store.chartData);
  return (
    <Doughnut
      data={{
        labels: activeAndInactivecount.map((item) => item._id),
        datasets: [
          {
            label: "Number",
            data: activeAndInactivecount.map((item) => item.count),
            backgroundColor: activeAndInactivecount.map(() => {
              return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
                Math.random() * 255
              )}, ${Math.ceil(Math.random() * 255)}, 0.5)`;
            }),
            hoverBackgroundColor: activeAndInactivecount.map(() => {
              return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
                Math.random() * 255
              )}, ${Math.ceil(Math.random() * 255)}, 0.8)`;
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
            text: " Total Availability of products",
          },
        },
      }}
    />
  );
}

export default DonoughtChart;
