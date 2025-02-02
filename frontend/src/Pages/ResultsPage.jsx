import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CircularProgressIndicators from "./CircularProgressIndicators"
import LineChart from "./LineChart"
import MetricsDisplay from "./MetricsDisplay"
import { BaseLayout } from "../Layouts"
import UserStaticDataForm from "./UserStaticDataForm"

export default function ResultsPage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setUserData(JSON.parse(savedProfile))
    } else {
      // If no profile exists, redirect to the form
      navigate("/dashboard")
    }
  }, [navigate])

  // Mock metrics data (in a real application, this would be calculated based on userData)
  const metrics = {
    heart_rate: 76,
    blood_pressure: "121/80",
    blood_sugar: 102,
    spo2: 98,
    respiratory_rate: 16,
    body_temperature: 37.1,
    timestamp: "2025-02-02 00:33:29",
  }

  // Mock historical data for the line chart
  const historicalData = {
    dates: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    heartRate: [72, 75, 73, 78, 76, 74, 76],
    bloodSugar: [105, 98, 103, 100, 99, 102, 102],
    temperature: [36.8, 36.9, 37.0, 37.1, 36.9, 37.0, 37.1],
    spo2: [97, 98, 98, 99, 98, 97, 98],
  }

  const analysis = `
Time elapsed: 120 seconds

Current Status:
- All vital signs are within normal ranges

Changes from Previous Reading:
- Heart Rate: 96 → 76
- Blood Pressure: 127/84 → 121/80
- Blood Sugar: 113 → 102
- Spo2: 100 → 98

Recommendations:
- Report any sudden changes
- Continue regular vital sign monitoring
- Ensure proper hydration
`

  const recommendations = ["Report any sudden changes", "Ensure proper hydration", "Document any symptoms or concerns"]

  const handleEditProfile = () => {
    setShowForm(true)
  }

  const handleFormSubmit = (updatedUserData) => {
    setUserData(updatedUserData)
    localStorage.setItem("userProfile", JSON.stringify(updatedUserData))
    setShowForm(false)
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8 mt-10">
        {showForm ? (
          <UserStaticDataForm initialData={userData} onSubmit={handleFormSubmit} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-600">Health Metrics Results</h1>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors hover:cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Current Metrics</h2>
                <CircularProgressIndicators metrics={metrics} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Historical Trends</h2>
                <LineChart historicalData={historicalData} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Metrics Summary</h2>
                <MetricsDisplay metrics={metrics} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Analysis</h2>
                <pre className="whitespace-pre-wrap text-sm">{analysis}</pre>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
              <ul className="list-disc pl-5 space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </BaseLayout>
  )
}

