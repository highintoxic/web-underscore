import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function UserStaticDataForm({ initialData, onSubmit }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(
    initialData || {
      age: "",
      gender: "",
      weight: "",
      height: "",
      lifestyle: "",
      medicalHistory: [],
    },
  )

  useEffect(() => {
    if (!initialData) {
      const savedProfile = localStorage.getItem("userProfile")
      if (savedProfile) {
        // If a profile exists, redirect to the results page
        navigate("/results")
      }
    }
  }, [navigate, initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (condition) => {
    setUserData((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter((item) => item !== condition)
        : [...prev.medicalHistory, condition],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(userData)
    } else {
      // Save the user data to localStorage
      localStorage.setItem("userProfile", JSON.stringify(userData))
      // Navigate to the results page
      navigate("/results")
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">User Health Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userData.weight}
              onChange={handleInputChange}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={userData.height}
              onChange={handleInputChange}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700 mb-1">
            Lifestyle
          </label>
          <select
            id="lifestyle"
            name="lifestyle"
            value={userData.lifestyle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select lifestyle</option>
            <option value="sedentary">Sedentary</option>
            <option value="moderately-active">Moderately Active</option>
            <option value="active">Active</option>
            <option value="very-active">Very Active</option>
          </select>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">Medical History</span>
          <div className="grid grid-cols-2 gap-4">
            {["cancer", "diabetes", "heart disease", "hypertension"].map((condition) => (
              <div key={condition} className="flex items-center">
                <input
                  type="checkbox"
                  id={condition}
                  name={condition}
                  checked={userData.medicalHistory.includes(condition)}
                  onChange={() => handleCheckboxChange(condition)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={condition} className="ml-2 block text-sm text-gray-900 capitalize">
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {initialData ? "Update Profile" : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  )
}

