import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LineChart = ({ historicalData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Health Metrics Trend (Last 7 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  }

  const data = {
    labels: historicalData.dates,
    datasets: [
      {
        label: "Heart Rate",
        data: historicalData.heartRate,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Blood Sugar",
        data: historicalData.bloodSugar,
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Temperature",
        data: historicalData.temperature,
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "SpO2",
        data: historicalData.spo2,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  }

  return <Line options={options} data={data} height={200} />
}

export default LineChart

