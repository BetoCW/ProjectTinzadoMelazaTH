import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Heart, Shield, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Melaza Tiznado</h3>
                <p className="text-sm text-gray-400">& Logística HT</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empresa mexicana especializada en distribución de melaza premium 
              y probióticos especiales con servicio de logística nacional.
            </p>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4">Productos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Melaza Premium Mayoreo</li>
              <li>Melaza Premium Menudeo</li>
              <li>Probióticos Especiales</li>
              <li>Logística Especializada</li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Facturación CFDI</li>
              <li>Entrega Nacional</li>
              <li>Cotizaciones Personalizadas</li>
              <li>Asesoría Técnica</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <p>📱 +52 55 1234-5678</p>
              <p>📧 ventas@melazatiznado.com</p>
              <p>📍 CDMX, México</p>
              <p>⏰ Lun - Vie: 8:00 AM - 6:00 PM</p>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 py-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="text-gray-300">Calidad Garantizada</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-green-500" />
            <span className="text-gray-300">Entrega Rápida</span>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-green-500" />
            <span className="text-gray-300">Empresa 100% Mexicana</span>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">
              <p>© 2025 Melaza Tiznado and Logística HT. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">
                Política de Privacidad
              </button>
              <button className="hover:text-white transition-colors">
                Términos de Servicio
              </button>
              <button className="hover:text-white transition-colors">
                Aviso Legal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
