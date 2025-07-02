import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shirt, 
  Bath, 
  Gamepad2, 
  Music,
  Wifi,
  Car,
  Coffee,
  Mountain,
  Shield,
  Clock,
  Users,
  MapPin
} from 'lucide-react';
import FacilityCard from '../components/FacilityCard';
import AnimatedSectionWrapper from '../components/AnimatedSectionWrapper';

const Facilities = () => {
  const mainFacilities = [
    {
      icon: Shirt,
      title: "Changing Room",
      description: "Private and clean changing rooms with lockers for your convenience and security",
      features: ["Private cubicles", "Secure lockers", "Clean & sanitized", "24/7 access"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bath,
      title: "Clean Washroom",
      description: "Modern, hygienic washroom facilities with hot water available round the clock",
      features: ["Hot water 24/7", "Western & Indian toilets", "Regular cleaning", "Eco-friendly products"],
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: Gamepad2,
      title: "Indoor Games",
      description: "Various indoor gaming activities to keep you entertained during your stay",
      features: ["Board games", "Card games", "Chess & Carrom", "Group activities"],
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Music,
      title: "Bonfire & Music",
      description: "Evening bonfire with music speakers for the perfect mountain night experience",
      features: ["Evening bonfire", "Sound system", "Live music", "Storytelling sessions"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Round-the-clock security for your safety and peace of mind",
      gradient: "from-gray-600 to-gray-800"
    },
    {
      icon: Clock,
      title: "24/7 Reception",
      description: "Our reception desk is always available to assist you",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Users,
      title: "Group Bookings",
      description: "Special arrangements and discounts for group bookings",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: MapPin,
      title: "Local Tours",
      description: "Guided tours to nearby attractions and scenic spots",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "High-speed internet access throughout the property",
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      icon: Car,
      title: "Secure Parking",
      description: "Safe parking facility for cars, bikes, and other vehicles",
      gradient: "from-amber-600 to-orange-600"
    },
    {
      icon: Coffee,
      title: "Restaurant",
      description: "In-house restaurant serving delicious local cuisine",
      gradient: "from-red-600 to-rose-600"
    },
    {
      icon: Mountain,
      title: "Trekking Guide",
      description: "Professional guides for Kalsubai Peak adventures",
      gradient: "from-emerald-600 to-teal-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSectionWrapper direction="down" className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Magical Facilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Discover all the enchanting amenities and services we offer to make your stay 
            at Hotel Kalsubai Gate Point truly magical and unforgettable.
          </motion.p>
        </AnimatedSectionWrapper>

        {/* Main Facilities */}
        <AnimatedSectionWrapper direction="up" delay={0.2} className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Core Facilities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainFacilities.map((facility, index) => (
              <FacilityCard
                key={index}
                icon={facility.icon}
                title={facility.title}
                description={facility.description}
                features={facility.features}
                index={index}
                gradient={facility.gradient}
              />
            ))}
          </div>
        </AnimatedSectionWrapper>

        {/* Additional Services */}
        <AnimatedSectionWrapper direction="up" delay={0.4} className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Additional Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-500`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSectionWrapper>

        {/* Why Choose Us Section */}
        <AnimatedSectionWrapper direction="up" delay={0.6}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20 relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-8"
              >
                Why Choose Our Magical Experience?
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <MapPin className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Prime Location</h3>
                  <p className="text-white/80">
                    Located at the base of Kalsubai Peak, Maharashtra's highest summit
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Users className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Authentic Experience</h3>
                  <p className="text-white/80">
                    Experience genuine Maharashtrian hospitality and local culture
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Mountain className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Adventure Ready</h3>
                  <p className="text-white/80">
                    Perfect base for trekking, camping, and exploring the Sahyadri mountains
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatedSectionWrapper>
      </div>
    </motion.div>
  );
};

export default Facilities;