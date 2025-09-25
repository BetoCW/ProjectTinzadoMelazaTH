import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, User } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: User,
      title: 'Gerente de Ventas',
      details: 'Ing. Carlos Tiznado',
      action: null
    },
    {
      icon: Phone,
      title: 'Teléfono Directo',
      details: '+52 55 1234-5678',
      action: () => window.open('tel:+525512345678')
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+52 55 1234-5678',
      action: () => window.open('https://wa.me/525512345678')
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'ventas@melazatiznado.com',
      action: () => window.open('mailto:ventas@melazatiznado.com')
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      details: 'CDMX, México',
      action: null
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      details: 'Lun - Vie: 8:00 AM - 6:00 PM',
      action: null
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-700">Contacto</span> Directo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comuníquese directamente con nuestro gerente de ventas para 
            cotizaciones personalizadas y atención especializada.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl shadow-lg border border-gray-100 ${
                item.action 
                  ? 'cursor-pointer hover:shadow-xl bg-gradient-to-br from-green-50 to-orange-50' 
                  : 'bg-white'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={item.action ? { y: -5 } : {}}
              onClick={item.action || undefined}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-xl">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.details}</p>
                </div>
                {item.action && (
                  <div className="text-sm text-green-600 font-medium">
                    Hacer click para contactar
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-green-600 to-orange-500 p-8 rounded-2xl text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para hacer su pedido?
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Contáctenos ahora para recibir una cotización personalizada y conocer nuestros precios especiales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => window.open('https://wa.me/525512345678')}
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </motion.button>
            <motion.button
              onClick={() => window.open('tel:+525512345678')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-700 transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              <span>Llamar</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
