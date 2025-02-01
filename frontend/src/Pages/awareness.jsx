import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import diseases from "../assets/disease"
import BaseLayout from "../Layouts/BaseLayout"

const DiseaseSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const disease = diseases[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % diseases.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + diseases.length) % diseases.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <BaseLayout>
    <div className="max-w-4xl mx-auto p-6 relative min-h-screen flex flex-col justify-center mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Disease Counter */}
        <div className="absolute left-8 top-8 text-sm text-emerald-500 font-medium">
          {currentIndex + 1} / {diseases.length}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-emerald-500 text-center mb-6">{disease.name}</h1>

        {/* Content */}
        <div className="space-y-6 text-gray-700 mb-12">
          <div>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">Overview</h2>
            <p>{disease.overview}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">Symptoms</h2>
            <ul className="list-disc pl-5">
              {disease.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">Causes</h2>
            <p>{disease.causes}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">Diagnosis</h2>
            <p>{disease.diagnosis}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">Treatment</h2>
            <p>{disease.treatment}</p>
          </div>
        </div>

        {/* Navigation Container */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex items-center justify-center gap-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-2 text-emerald-500 hover:text-emerald-600 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Navigation Dots */}
            <div className="flex gap-3">
              {diseases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-emerald-500 scale-125" : "bg-gray-300 hover:bg-emerald-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-2 text-emerald-500 hover:text-emerald-600 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </BaseLayout>
    
  )
}

export default DiseaseSlider

