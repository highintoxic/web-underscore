import { useState } from "react"

export const WaterIntakeCalculator = ({ saveResult }) => {
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("sedentary")
  const [climate, setClimate] = useState("moderate")
  const [result, setResult] = useState(null)

  const calculateWaterIntake = () => {
    if (!weight) {
      setResult("Please enter your weight.")
      return
    }

    let baseIntake = weight * 0.033 // 33ml per kg of body weight

    // Adjust for activity level
    switch (activityLevel) {
      case "light":
        baseIntake *= 1.1
        break
      case "moderate":
        baseIntake *= 1.2
        break
      case "active":
        baseIntake *= 1.3
        break
      default:
        break
    }

    // Adjust for climate
    switch (climate) {
      case "hot":
        baseIntake *= 1.1
        break
      case "humid":
        baseIntake *= 1.15
        break
      default:
        break
    }

    const waterIntake = baseIntake.toFixed(2)
    setResult(`Your recommended daily water intake is ${waterIntake} liters`)
    saveResult("WaterIntake", waterIntake)
  }

  return (
    <div>
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
        <label className="block text-lg mb-2">Activity Level:</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light Activity</option>
          <option value="moderate">Moderate Activity</option>
          <option value="active">Very Active</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Climate:</label>
        <select value={climate} onChange={(e) => setClimate(e.target.value)} className="w-full p-2 border rounded">
          <option value="moderate">Moderate</option>
          <option value="hot">Hot</option>
          <option value="humid">Humid</option>
        </select>
      </div>
      <button
        onClick={calculateWaterIntake}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors hover:cursor-pointer"
      >
        Calculate Water Intake
      </button>
      {result && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  )
}

