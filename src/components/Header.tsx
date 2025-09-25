import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Truck, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-green-700 to-green-600 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-800">Melaza Tiznado</h1>
              <p className="text-xs text-gray-600">& Logística HT</p>
            </div>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('productos')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Productos
            </button>
            <button 
              onClick={() => scrollToSection('pedidos')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Hacer Pedido
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Contacto
            </button>
            <motion.a
              href="tel:+525512345678"
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              <span>Llamar Ahora</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden mt-4 pb-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-left text-gray-700 hover:text-green-700 font-medium"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('productos')}
                className="text-left text-gray-700 hover:text-green-700 font-medium"
              >
                Productos
              </button>
              <button 
                onClick={() => scrollToSection('pedidos')}
                className="text-left text-gray-700 hover:text-green-700 font-medium"
              >
                Hacer Pedido
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="text-left text-gray-700 hover:text-green-700 font-medium"
              >
                Contacto
              </button>
              <a
                href="tel:+525512345678"
                className="btn-primary text-center"
              >
                📞 Llamar Ahora
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
