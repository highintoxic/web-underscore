const MetricItem = ({ icon, label, value, unit, status, color }) => (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <span>{label}:</span>
      </div>
      <div>
        <span className="font-bold mr-2">
          {value} {unit}
        </span>
        <span className={`inline-block w-3 h-3 rounded-full ${color}`}></span>
        <span className="ml-1 text-sm">({status})</span>
      </div>
    </div>
  )
  
  const MetricsDisplay = ({ metrics }) => {
    return (
      <div className="space-y-4">
        <MetricItem
          icon="❤️"
          label="Heart Rate"
          value={metrics.heart_rate}
          unit="BPM"
          status="Normal"
          color="bg-green-500"
        />
        <MetricItem
          icon="🩸"
          label="Blood Pressure"
          value={metrics.blood_pressure}
          unit="mmHg"
          status="Ideal"
          color="bg-green-500"
        />
        <MetricItem
          icon="🩸"
          label="Blood Sugar"
          value={metrics.blood_sugar}
          unit="mg/dL"
          status="Pre-Diabetic"
          color="bg-yellow-500"
        />
        <MetricItem
          icon="🌡"
          label="Body Temp"
          value={metrics.body_temperature}
          unit="°C"
          status="Normal"
          color="bg-green-500"
        />
        <MetricItem icon="💨" label="SpO2" value={metrics.spo2} unit="%" status="Normal" color="bg-green-500" />
      </div>
    )
  }
  
  export default MetricsDisplay
  
  