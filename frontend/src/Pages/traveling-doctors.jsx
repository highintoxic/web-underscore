"use client"

import { useState, useEffect } from "react"
import { format, isEqual, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { BaseLayout } from "../Layouts"

// Symptom keywords mapping to specialties
const symptomSpecialties = {
  "headache": "Neurologist",
  "migraine": "Neurologist",
  "stomach": "Gastroenterologist",
  "digestion": "Gastroenterologist",
  "skin": "Dermatologist",
  "rash": "Dermatologist",
  "fever": "Physician",
  "cough": "Physician",
  // Add more keywords as needed
}

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialty: "Physician",
    availability: ["2025-02-04", "2025-02-11", "2025-02-12"],
    location: { latitude: 40.7128, longitude: -74.006 }, // Example coordinates
    rating: 4.5,
  },
  { id: 2, name: "Dr. Johnson", specialty: "Neurologist", availability: ["2025-02-12", "2025-02-13", "2025-02-21"], location: { latitude: 40.7128, longitude: -74.006 }, rating: 4.5 },
  {
    id: 3,
    name: "Dr. Williams",
    specialty: "Gastroenterologist",
    availability: ["2025-03-10", "2025-03-12", "2025-02-07"],
    location: { latitude: 40.7128, longitude: -74.006 },
    rating: 4.5,
  },
  { id: 4, name: "Dr. Brown", specialty: "Dermatologist", availability: ["2025-02-11", "2025-02-13", "2025-03-16"], location: { latitude: 40.7128, longitude: -74.006 }, rating: 4.5 },
]

function Calendar({ selected, onSelect, disabled, className }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1))
  }

  return (
    <div className={`p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2">
          &lt;
        </button>
        <div>{format(currentMonth, "MMMM yyyy")}</div>
        <button onClick={handleNextMonth} className="p-2">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {daysInMonth.map((date) => {
          const isDisabled = disabled ? disabled(date) : false
          const isSelected = selected && isEqual(date, new Date(selected))
          return (
            <button
              key={date.toISOString()}
              onClick={() => !isDisabled && onSelect(format(date, "yyyy-MM-dd"))}
              disabled={isDisabled}
              className={`p-2 rounded-full ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-200"
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function TravelingDoctors() {
  const [symptomInput, setSymptomInput] = useState("")
  const [recommendedDoctor, setRecommendedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  useEffect(() => {
    if (symptomInput) {
      const keywords = symptomInput.toLowerCase().split(" ")
      const matchedSpecialty = keywords.map((keyword) => symptomSpecialties[keyword]).find((specialty) => specialty)
      if (matchedSpecialty) {
        const doctor = mockDoctors.find((d) => d.specialty === matchedSpecialty)
        setRecommendedDoctor(doctor)
      }
    }
  }, [symptomInput])

  const handleBookAppointment = () => {
    console.log("Booking appointment with:", recommendedDoctor, "on", selectedDate)
    console.log("User location:", userLocation)
    setBookingConfirmed(true)
    // We don't need to update the selectedDate here as it's already set
    setTimeout(() => {
      console.log("Doctor notified of new appointment")
    }, 2000)
  }

  return (
    <BaseLayout>
    <div className="container min-h-screen mx-auto p-4 mt-20">
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Book a Traveling Doctor</h2>
          <p className="text-gray-600 mb-6">Enter your symptoms and we'll find a doctor for you</p>
          {!bookingConfirmed ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">What are your symptoms?</label>
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., headache, stomach pain"
                />
              </div>
              {recommendedDoctor && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Recommended Doctor:</h3>
                  <p>
                    {recommendedDoctor.name} ({recommendedDoctor.specialty})
                  </p>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a date:</label>
                    <Calendar
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => !recommendedDoctor.availability.includes(format(date, "yyyy-MM-dd"))}
                      className="rounded-md border"
                    />
                    {selectedDate && (
                      <p className="mt-2 text-sm text-blue-600">
                        Selected date: {format(new Date(selectedDate), "MMMM d, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto mb-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Appointment Confirmed!</h3>
              <p>A doctor will be notified and will contact you soon.</p>
              <p className="mt-2 text-sm text-blue-600">
                Booked date: {format(new Date(selectedDate), "MMMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50">
          {recommendedDoctor && !bookingConfirmed && (
            <button
              onClick={handleBookAppointment}
              disabled={!selectedDate}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>
    </div>
    </BaseLayout>

  )
}

