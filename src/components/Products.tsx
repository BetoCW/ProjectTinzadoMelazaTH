import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Flask, Truck, Shield } from 'lucide-react';

const Products: React.FC = () => {
  const products = [
    {
      icon: Droplets,
      title: 'Melaza Premium',
      subtitle: 'Mayoreo y Menudeo',
      description: 'Melaza de caña de azúcar de la más alta calidad, ideal para uso industrial, ganadero y alimentario.',
      features: [
        'Pureza garantizada',
        'Análisis de laboratorio incluido',
        'Disponible en diferentes presentaciones',
        'Precios competitivos para mayoreo'
      ],
      available: true,
      pricing: 'Desde $50 MXN por kg'
    },
    {
      icon: Flask,
      title: 'Probióticos Especiales',
      subtitle: 'Solo por Pedido',
      description: 'Probióticos especializados para clientes que requieren formulaciones específicas y personalizadas.',
      features: [
        'Formulación personalizada',
        'Certificaciones de calidad',
        'Asesoría técnica especializada',
        'Entrega programada'
      ],
      available: true,
      pricing: 'Cotización bajo pedido'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Calidad Garantizada',
      description: 'Todos nuestros productos cuentan con certificaciones de calidad y análisis de laboratorio.'
    },
    {
      icon: Truck,
      title: 'Logística Especializada',
      description: 'Contamos con flota propia y rutas optimizadas para garantizar la entrega en tiempo y forma.'
    }
  ];

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestros <span className="text-green-700">Productos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos melaza de la más alta calidad y probióticos especializados 
            con servicio de logística profesional en todo México.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 rounded-xl">
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-orange-600 font-medium">{product.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="space-y-3 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-2xl font-bold text-green-700">{product.pricing}</div>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('pedidos');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Solicitar Cotización
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-orange-50 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white p-3 rounded-lg shadow-md">
                <benefit.icon className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
