import React from 'react';
import { motion } from 'framer-motion';
import { BaseLayout } from '../Layouts';

const HomePage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Medical background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/40" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center text-white"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Your Health, Our Priority
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              variants={fadeInUp}
            >
              Advanced medical care with a personal touch
            </motion.p>
            <motion.button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              variants={fadeInUp}
			  
            >
              Book Appointment
            </motion.button>
          </motion.div>
        </div>
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
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
            variants={fadeInUp}
          >
            Our Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary Care",
                description: "Comprehensive health care for you and your family",
                icon: "🏥"
              },
              {
                title: "Specialized Treatment",
                description: "Expert care in various medical specialties",
                icon: "⚕️"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock medical assistance",
                icon: "🕒"
              }
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
        className="py-16 bg-blue-900 text-white"
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
              { number: "24/7", label: "Support" }
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

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeInUp}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-100"
            variants={fadeInUp}
          >
            Schedule your consultation today and take the first step towards better health.
          </motion.p>
          <motion.button 
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.section>
    </div>
	</BaseLayout>
    
  );
};

export default HomePage;