import { useState } from "react"
import { BaseLayout } from "../Layouts"
import { HealthChart } from "./health-chart"
import { HealthRecommendations } from "./health-recommendations"
import { ProgressTracker } from "./progress-tracker"
import { WaterIntakeCalculator } from "./water-intake-calculator"
import { MentalHealthAssessment } from "./mental-health-assessment"

const HealthCalculator = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [waist, setWaist] = useState("")
  const [result, setResult] = useState(null)
  const [healthData, setHealthData] = useState([])

  const saveResult = (type, value) => {
    const newData = [...healthData, { type, value, date: new Date().toISOString() }]
    setHealthData(newData)
    localStorage.setItem("healthData", JSON.stringify(newData))
  }

  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / (height * height)).toFixed(2)
      setResult(`Your BMI is ${bmiValue}`)
      saveResult("BMI", bmiValue)
    } else {
      setResult("Please enter both weight and height.")
    }
  }

  const calculateBMR = () => {
    if (weight && height && age) {
      const bmrValue =
        gender === "male"
          ? 10 * weight + 6.25 * (height * 100) - 5 * age + 5
          : 10 * weight + 6.25 * (height * 100) - 5 * age - 161
      setResult(`Your BMR is ${bmrValue.toFixed(2)} calories/day`)
      saveResult("BMR", bmrValue.toFixed(2))
    } else {
      setResult("Please enter weight, height, and age.")
    }
  }

  const calculateBodyFat = () => {
    if (waist && height) {
      const bodyFatValue = ((waist / (height * 100)) * 100).toFixed(2)
      setResult(`Your estimated body fat percentage is ${bodyFatValue}%`)
      saveResult("BodyFat", bodyFatValue)
    } else {
      setResult("Please enter waist circumference and height.")
    }
  }

  const calculateDiabetesRisk = () => {
    if (weight && height && age) {
      const bmi = (weight / (height * height)).toFixed(2)
      const risk = age > 45 || bmi > 25 ? "High" : "Low"
      setResult(`Your diabetes risk is: ${risk}`)
      saveResult("DiabetesRisk", risk)
    } else {
      setResult("Please enter weight, height, and age.")
    }
  }

  const handleCalculate = () => {
    switch (selectedCalculator) {
      case "BMI":
        calculateBMI()
        break
      case "BMR":
        calculateBMR()
        break
      case "BodyFat":
        calculateBodyFat()
        break
      case "DiabetesRisk":
        calculateDiabetesRisk()
        break
      default:
        setResult("Please select a calculator.")
    }
  }

  return (
    <BaseLayout>
      <div className="w-full min-h-screen bg-gray-100 sm:p-6 mt-10">
        <div className="w-full sm:p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Multi-Functional Health Calculator</h1>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Select Calculator:</label>
                  <select
                    value={selectedCalculator}
                    onChange={(e) => {
                      setSelectedCalculator(e.target.value)
                      setResult(null)
                    }}
                    className="w-full p-2 border rounded hover:cursor-pointer"
                  >
                    <option value="">-- Select --</option>
                    <option value="BMI">BMI Calculator</option>
                    <option value="BMR">BMR Calculator</option>
                    <option value="BodyFat">Body Fat Percentage</option>
                    <option value="DiabetesRisk">Diabetes Risk</option>
                    <option value="WaterIntake">Water Intake Calculator</option>
                    <option value="MentalHealth">Mental Health Self-Assessment</option>
                  </select>
                </div>

                {(selectedCalculator === "BMI" ||
                  selectedCalculator === "BMR" ||
                  selectedCalculator === "DiabetesRisk") && (
                  <>
                    <div className="mb-4">
                      <label className="block text-lg mb-2">Weight (kg):</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-lg mb-2">Height (m):</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </>
                )}

                {(selectedCalculator === "BMR" || selectedCalculator === "DiabetesRisk") && (
                  <div className="mb-4">
                    <label className="block text-lg mb-2">Age:</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                {selectedCalculator === "BMR" && (
                  <div className="mb-4">
                    <label className="block text-lg mb-2">Gender:</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}

                {selectedCalculator === "BodyFat" && (
                  <div className="mb-4">
                    <label className="block text-lg mb-2">Waist Circumference (cm):</label>
                    <input
                      type="number"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                {selectedCalculator === "WaterIntake" && <WaterIntakeCalculator saveResult={saveResult} />}

                {selectedCalculator === "MentalHealth" && <MentalHealthAssessment saveResult={saveResult} />}

                {selectedCalculator &&
                  selectedCalculator !== "WaterIntake" &&
                  selectedCalculator !== "MentalHealth" && (
                    <button
                      onClick={handleCalculate}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors hover:cursor-pointer"
                    >
                      Calculate
                    </button>
                  )}

                {result && (
                  <div className="mt-6 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Result:</h2>
                    <p className="text-lg">{result}</p>
                  </div>
                )}
              </div>

              <div>
                <HealthChart
                  data={healthData.filter((item) => item.type === selectedCalculator)}
                  type={selectedCalculator}
                />
                <HealthRecommendations result={result} selectedCalculator={selectedCalculator} />
              </div>
            </div>

            <ProgressTracker data={healthData} />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default HealthCalculator

