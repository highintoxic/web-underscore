import { useState, useEffect } from "react"
import Cookies from "js-cookie"
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

  // Load data from cookies on initial render
  useEffect(() => {
    const cookieData = Cookies.get("healthData")
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData)
        setHealthData(parsedData)
        // Sync with localStorage for backup
        localStorage.setItem("healthData", cookieData)
      } catch (error) {
        console.error("Error parsing cookie data:", error)
        // Fallback to localStorage if cookie parsing fails
        const localData = localStorage.getItem("healthData")
        if (localData) {
          try {
            setHealthData(JSON.parse(localData))
          } catch (error) {
            console.error("Error parsing localStorage data:", error)
          }
        }
      }
    }
  }, [])

  const saveResult = (type, value) => {
    const newData = [...healthData, { type, value, date: new Date().toISOString() }]
    setHealthData(newData)

    // Save to both cookies and localStorage
    try {
      const jsonData = JSON.stringify(newData)
      // Set cookie with 30 days expiration
      Cookies.set("healthData", jsonData, { expires: 30, secure: true, sameSite: "strict" })
      localStorage.setItem("healthData", jsonData)
    } catch (error) {
      console.error("Error saving data:", error)
    }
  }

  // Clear all stored data
  const clearStoredData = () => {
    setHealthData([])
    Cookies.remove("healthData")
    localStorage.removeItem("healthData")
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
      <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 mt-15">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4 sm:mb-6 px-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Multi-Functional Health Calculator</h1>
            <button
              onClick={clearStoredData}
              className="text-sm px-3 py-1 text-red-600 hover:text-red-700 border border-red-600 rounded hover:bg-red-50 transition-colors hover:cursor-pointer "
            >
              Clear All Data
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-base sm:text-lg font-medium mb-2">Select Calculator:</label>
                    <select
                      value={selectedCalculator}
                      onChange={(e) => {
                        setSelectedCalculator(e.target.value)
                        setResult(null)
                      }}
                      className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                  <div className="space-y-4">
                    {(selectedCalculator === "BMI" ||
                      selectedCalculator === "BMR" ||
                      selectedCalculator === "DiabetesRisk" || selectedCalculator=="BodyFat") && (
                      <>
                        <div>
                          <label className="block text-base sm:text-lg font-medium mb-2">Weight (kg):</label>
                          <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-base sm:text-lg font-medium mb-2">Height (m):</label>
                          <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}

                    {(selectedCalculator === "BMR" || selectedCalculator === "DiabetesRisk") && (
                      <div>
                        <label className="block text-base sm:text-lg font-medium mb-2">Age:</label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}

                    {selectedCalculator === "BMR" && (
                      <div>
                        <label className="block text-base sm:text-lg font-medium mb-2">Gender:</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    )}

                    {selectedCalculator === "BodyFat" && (
                      <div>
                        <label className="block text-base sm:text-lg font-medium mb-2">Waist Circumference (cm):</label>
                        <input
                          type="number"
                          value={waist}
                          onChange={(e) => setWaist(e.target.value)}
                          className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  {selectedCalculator === "WaterIntake" && <WaterIntakeCalculator saveResult={saveResult} />}

                  {selectedCalculator === "MentalHealth" && <MentalHealthAssessment saveResult={saveResult} />}

                  {selectedCalculator &&
                    selectedCalculator !== "WaterIntake" &&
                    selectedCalculator !== "MentalHealth" && (
                      <button
                        onClick={handleCalculate}
                        className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Calculate
                      </button>
                    )}

                  {result && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2">Result:</h2>
                      <p className="text-base sm:text-lg">{result}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <HealthChart
                    data={healthData.filter((item) => item.type === selectedCalculator)}
                    type={selectedCalculator}
                  />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <HealthRecommendations result={result} selectedCalculator={selectedCalculator} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <ProgressTracker data={healthData} />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default HealthCalculator

