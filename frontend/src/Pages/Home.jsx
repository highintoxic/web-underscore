import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BaseLayout } from "../Layouts"
import { ChevronLeft, ChevronRight } from "lucide-react"
import HeroBackground from "../Components/HeroBackground"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const navigate = useNavigate()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const funFacts = [
    {
      number: "1️⃣",
      title: "Cocaine as Anesthetic",
      description:
        "In the 1800s, cocaine was commonly used as a painkiller and even in cough syrups before its dangers were known!",
      emoji: "🤯",
    },
    {
      number: "2️⃣",
      title: "New Stomach Lining",
      description:
        "Your stomach lining constantly regenerates because it would otherwise digest itself due to the strong acid!",
      emoji: "🤢",
    },
    {
      number: "3️⃣",
      title: "Speed Surgery",
      description:
        "In the 19th century, surgeons raced against time because anesthesia was limited! The fastest recorded amputation? 28 seconds!",
      emoji: "⏳",
    },
    {
      number: "4️⃣",
      title: "First Face Transplant",
      description: "A woman in France became the first person to receive a partial face transplant after a dog attack!",
      emoji: "😮",
    },
    {
      number: "5️⃣",
      title: "Barber Surgeons",
      description:
        "In medieval times, barbers performed surgeries, pulled teeth, and even set broken bones while also giving haircuts!",
      emoji: "💈",
    },
    {
      number: "6️⃣",
      title: "3D-Printed Organs",
      description: "Scientists have successfully 3D-printed human skin, ears, and even mini hearts using bio-printing!",
      emoji: "🖨",
    },
    {
      number: "7️⃣",
      title: "Survival Without Organs",
      description: "The human body is so adaptable that many organs aren't 100% essential for survival!",
      emoji: "😳",
    },
    {
      number: "8️⃣",
      title: "Laughing Burns Calories",
      description: "Laughter increases heart rate and oxygen consumption, helping burn calories like light exercise!",
      emoji: "😂",
    },
    {
      number: "9️⃣",
      title: "Blood Types & Mosquitoes",
      description: "People with Type O blood are bitten twice as much as those with Type A or B!",
      emoji: "🦟",
    },
    {
      number: "🔟",
      title: "Strong Bones",
      description: "Ounce for ounce, human bones are 5 times stronger than steel, yet incredibly lightweight!",
      emoji: "💪",
    },
  ]

  const nextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length)
  }

  const prevFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex - 1 + funFacts.length) % funFacts.length)
  }

  const handleBookAppointment = () => {
    navigate("/doctor")
  }
  const handlecontactus=()=>{
    navigate("/contact")
  }
  return (
    <BaseLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <motion.section
          className="relative h-screen flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroBackground />

          <div className="container mx-auto px-4 z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center text-white"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="overflow-hidden mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    bounce: 0.4,
                  }}
                >
                  Empowering Health,{" "}
                  <motion.span
                    className="inline-block text-blue-400"
                    animate={{
                      color: ["#60A5FA", "#818CF8", "#60A5FA"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    Elevating Lives
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl mb-8 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Delivering innovative, personalized healthcare solutions to empower your well-being and elevate your quality of life!
              </motion.p>

              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium relative overflow-hidden group hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    originX: 0,
                    originY: 0,
                    opacity: 0.1,
                  }}
                />
                <span className="relative z-10">Book Appointment</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-1 bg-white rounded-full"
                animate={{
                  y: [0, 16, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          className="py-20 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800" variants={fadeInUp}>
              Our Services
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Primary Care",
                  description: "Comprehensive health care for you and your family",
                  icon: "🏥",
                },
                {
                  title: "Specialized Treatment",
                  description: "Expert care in various medical specialties",
                  icon: "⚕️",
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock medical assistance",
                  icon: "🕒",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-50 p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-4xl mb-4 block">{service.icon}</span>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10k+", label: "Patients Served" },
                { number: "50+", label: "Specialists" },
                { number: "15+", label: "Years Experience" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Fun Facts Section */}
        <motion.section
          className="py-20 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between relative">
                <button
                  onClick={prevFact}
                  className="absolute left-0 z-10 p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ChevronLeft size={24} className="hover:cursor-pointer" />
                </button>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFactIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full px-16"
                  >
                    <h3 className="text- text-4xl font-bold text-center mb-6">{funFacts[currentFactIndex].title}</h3>
                    <p className="text-center text-xl leading-relaxed max-w-3xl mx-auto">
                      {funFacts[currentFactIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={nextFact}
                  className="absolute right-0 z-10 p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ChevronRight size={24} className="hover:cursor-pointer" />
                </button>
                <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {funFacts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFactIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors hover:cursor-pointer ${
                        index === currentFactIndex ? "bg-[#00FF7F]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeInUp}>
              Ready to Get Started?
            </motion.h2>
            <motion.p className="text-xl mb-8 text-blue-100" variants={fadeInUp}>
              Schedule your consultation today and take the first step towards better health.
            </motion.p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition-colors hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlecontactus}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.section>
      </div>
    </BaseLayout>
  )
}

export default HomePage

