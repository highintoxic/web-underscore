import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, AlertCircle, Thermometer, Stethoscope, Pill } from "lucide-react"
import diseases from "../assets/disease"
import BaseLayout from "../Layouts/BaseLayout"
import { motion, AnimatePresence } from "framer-motion"

const EnhancedDiseaseSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDiseases, setFilteredDiseases] = useState(diseases)
  const disease = filteredDiseases[currentIndex]

  useEffect(() => {
    const filtered = diseases.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredDiseases(filtered)
    setCurrentIndex(0)
  }, [searchTerm])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredDiseases.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredDiseases.length) % filteredDiseases.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <BaseLayout>
      <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="w-full max-w-6xl  p-6 md:p-10 relative overflow-hidden">
          {/* Search Bar */}
          <div className="mb-6 bg-white rounded-full relative">
            <input
              type="text"
              placeholder="Search diseases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-full border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500" />
          </div>

          

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-600 text-center mb-8">{disease.name}</h1>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-6 text-gray-700 mb-12">
                <DiseaseCard title="Overview" icon={AlertCircle} content={disease.overview} />
                <DiseaseCard title="Symptoms" icon={Thermometer} content={disease.symptoms} isList />
                <DiseaseCard title="Causes" icon={Stethoscope} content={disease.causes} />
                <DiseaseCard title="Diagnosis" icon={Search} content={disease.diagnosis} />
                <DiseaseCard title="Treatment" icon={Pill} content={disease.treatment} className="md:col-span-2" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / filteredDiseases.length) * 100}%` }}
            ></div>
          </div>

          {/* Navigation Container */}
          <div className="flex items-center justify-center gap-6">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-2 text-emerald-500 hover:text-emerald-600 transition-colors transform hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Navigation Dots */}
            <div className="flex gap-3">
              {filteredDiseases.map((_, index) => (
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
              className="p-2 text-emerald-500 hover:text-emerald-600 transition-colors transform hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

const DiseaseCard = ({ title, icon: Icon, content, isList, className }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
    <div className="flex items-center mb-4">
      <Icon className="text-emerald-500 mr-2" size={24} />
      <h2 className="text-xl font-semibold text-emerald-600">{title}</h2>
    </div>
    {isList ? (
      <ul className="list-disc pl-5 space-y-2">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <p>{content}</p>
    )}
  </div>
)

export default EnhancedDiseaseSlider

