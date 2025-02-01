export const ProgressTracker = ({ data }) => {
    const getLatestValue = (type) => {
      const typeData = data.filter((item) => item.type === type)
      return typeData.length > 0 ? typeData[typeData.length - 1].value : "N/A"
    }
  
    return (
      <div className="mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Health Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-medium">Latest BMI</h3>
            <p className="text-xl">{getLatestValue("BMI")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Latest BMR</h3>
            <p className="text-xl">{getLatestValue("BMR")} calories/day</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Latest Body Fat %</h3>
            <p className="text-xl">{getLatestValue("BodyFat")}%</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Latest Diabetes Risk</h3>
            <p className="text-xl">{getLatestValue("DiabetesRisk")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Latest Water Intake</h3>
            <p className="text-xl">{getLatestValue("WaterIntake")} liters</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Latest Mental Health Score</h3>
            <p className="text-xl">{getLatestValue("MentalHealth")}</p>
          </div>
        </div>
      </div>
    )
  }
  
  