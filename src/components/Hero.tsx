import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Star, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToOrderForm = () => {
    const element = document.getElementById('pedidos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Star className="w-4 h-4" />
              <span>Empresa 100% Mexicana</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-green-700">Melaza</span> de Alta Calidad
              <br />
              <span className="text-orange-600">Mayoreo & Menudeo</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Especialistas en distribución de melaza premium y probióticos especiales. 
              Servicio de logística confiable en todo México con facturación fiscal.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={scrollToOrderForm}
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hacer Pedido Ahora
              </motion.button>
              <motion.a
                href="tel:+525512345678"
                className="btn-secondary text-lg px-8 py-4 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contactar Gerente
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">5+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">500+</div>
                <div className="text-sm text-gray-600">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">24h</div>
                <div className="text-sm text-gray-600">Tiempo de respuesta</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-gradient-to-br from-green-400 to-orange-400 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
              
              <div className="relative z-10 space-y-6 text-white">
                <div className="flex items-center space-x-4 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="bg-white/30 p-3 rounded-lg">
                    <Truck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Logística Profesional</h3>
                    <p className="text-white/80">Entrega en todo México</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="bg-white/30 p-3 rounded-lg">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Cobertura Nacional</h3>
                    <p className="text-white/80">Servicio en toda la República</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="bg-white/30 p-3 rounded-lg">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Entrega Rápida</h3>
                    <p className="text-white/80">Tiempos optimizados</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-orange-400 rounded-full opacity-60"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-60"
              animate={{
                y: [0, 20, 0],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
