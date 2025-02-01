"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const CircularProgressIndicator = ({ value, maxValue, label, color }) => {
  const data = {
    datasets: [
      {
        data: [value, maxValue - value],
        backgroundColor: [color, "#e0e0e0"],
        borderWidth: 0,
        circumference: 270,
        rotation: 225,
      },
    ],
  }

  const options = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  return (
    <div className="relative w-32 h-32">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs">{label}</span>
      </div>
    </div>
  )
}

const CircularProgressIndicators = ({ metrics }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-8">
        <CircularProgressIndicator value={metrics.heart_rate} maxValue={120} label="Heart Rate" color="#FF6384" />
        <CircularProgressIndicator value={metrics.spo2} maxValue={100} label="SpO2" color="#36A2EB" />
      </div>
      <div className="flex gap-8">
        <CircularProgressIndicator value={metrics.blood_sugar} maxValue={200} label="Blood Sugar" color="#FFCE56" />
        <CircularProgressIndicator
          value={metrics.respiratory_rate}
          maxValue={30}
          label="Respiratory Rate"
          color="#4BC0C0"
        />
      </div>
    </div>
  )
}

export default CircularProgressIndicators

