import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1920&q=80",
]

// DNA Helix Animation Component
const DNAHelix = () => (
  <motion.div className="absolute left-2 sm:left-4 md:left-10 top-1/4 scale-50 sm:scale-75 md:scale-100">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="relative"
        style={{ height: "20px", marginBottom: "10px" }}
        animate={{
          rotateX: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 0.2,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-400 rounded-full"
          style={{ left: `${Math.sin(i * 0.5) * 15}px` }}
        />
        <motion.div
          className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-green-400 rounded-full"
          style={{ right: `${Math.sin(i * 0.5) * 15}px` }}
        />
        <motion.div className="absolute left-0 right-0 h-0.5 bg-white/20" />
      </motion.div>
    ))}
  </motion.div>
)

// EKG Line Animation Component
const EKGLine = () => (
  <motion.div className="absolute bottom-4 sm:bottom-10 md:bottom-20 left-0 right-0 h-10 sm:h-16 md:h-20">
    <svg viewBox="0 0 800 100" className="w-full h-full opacity-30">
      <motion.path
        d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 100 50"
        stroke="white"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          x: [0, -100],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 100 50"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            x: [800 - i * 100, 700 - i * 100],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: i * 0.2,
          }}
        />
      ))}
    </svg>
  </motion.div>
)

// Medical Cross Animation Component
const MedicalCross = () => (
  <motion.div
    className="absolute right-2 sm:right-4 md:right-10 top-1/4 flex items-center justify-center scale-50 sm:scale-75 md:scale-100"
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    <motion.div
      className="relative w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20"
      animate={{
        boxShadow: [
          "0 0 10px rgba(59, 130, 246, 0.5)",
          "0 0 20px rgba(59, 130, 246, 0.7)",
          "0 0 10px rgba(59, 130, 246, 0.5)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <motion.div className="absolute w-full h-1/4 bg-blue-500 rounded-md top-1/2 -translate-y-1/2" />
      <motion.div className="absolute h-full w-1/4 bg-blue-500 rounded-md left-1/2 -translate-x-1/2" />
    </motion.div>
  </motion.div>
)

const FloatingIcon = ({ emoji, x, y, delay }) => (
  <motion.div
    className="absolute text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
    initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
    animate={{
      x: [`${x}vw`, `${x + (Math.random() * 10 - 5)}vw`],
      y: [`${y}vh`, `${y + (Math.random() * 10 - 5)}vh`],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  >
    {emoji}
  </motion.div>
)

export default function HeroBackground() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentImage] || "/placeholder.svg"}
            alt="Medical background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/60" />
        </motion.div>
      </AnimatePresence>

      {/* DNA Helix Animation */}
      <DNAHelix />

      {/* Medical Cross Animation */}
      <MedicalCross />

      {/* EKG Line Animation */}
      <EKGLine />

      {/* Floating Medical Icons - Responsive positioning */}
      <FloatingIcon emoji="💊" x={10} y={20} delay={0} />
      <FloatingIcon emoji="🩺" x={20} y={60} delay={2} />
      <FloatingIcon emoji="🧬" x={70} y={30} delay={1} />
      <FloatingIcon emoji="⚕️" x={80} y={70} delay={3} />
      <FloatingIcon emoji="🫀" x={40} y={40} delay={2} />

      {/* Particle Effect - Responsive sizing */}
      <div className="particle-container absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Heartbeat Animation - Responsive sizing */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <motion.div className="absolute inset-0 border-2 sm:border-4 border-red-500 rounded-full" />
        <motion.div
          className="absolute inset-0 border-2 sm:border-4 border-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </div>
  )
}

