import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { FormData, ValidationErrors, Order } from '../types';

interface OrderFormProps {
  onOrderSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    rfc: '',
    email: '',
    phone: '',
    product: 'melaza',
    saleType: 'mayoreo',
    quantity: '',
    deliveryAddress: '',
    invoiceType: 'cfdi'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateRFC = (rfc: string): boolean => {
    const rfcRegex = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
    return rfcRegex.test(rfc.toUpperCase());
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+52|52)?[-\s]?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre o razón social es requerido';
    }

    if (formData.invoiceType === 'cfdi' && !formData.rfc.trim()) {
      newErrors.rfc = 'El RFC es requerido para facturación CFDI';
    } else if (formData.rfc && !validateRFC(formData.rfc)) {
      newErrors.rfc = 'El RFC no tiene un formato válido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no tiene un formato válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'La cantidad es requerida';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'La cantidad debe ser un número válido mayor a 0';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'La dirección de entrega es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = (): string => {
    const productName = formData.product === 'melaza' ? 'Melaza' : 'Probióticos';
    const saleTypeName = formData.saleType === 'mayoreo' ? 'Mayoreo' : 'Menudeo';
    const invoiceTypeName = formData.invoiceType === 'cfdi' ? 'CFDI' : 'Ticket';

    return `🚚 *NUEVO PEDIDO - Melaza Tiznado*

📦 *Producto:* ${productName} (${saleTypeName})
📊 *Cantidad:* ${formData.quantity} kg
👤 *Cliente:* ${formData.customerName}
${formData.rfc ? `🆔 *RFC:* ${formData.rfc}` : ''}
📧 *Email:* ${formData.email}
📱 *Teléfono:* ${formData.phone}
📍 *Dirección:* ${formData.deliveryAddress}
🧾 *Facturación:* ${invoiceTypeName}

*Para confirmar este pedido, favor de responder a este mensaje.*

_Pedido generado desde: melazatiznado.com_`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear el pedido
      const newOrder: Order = {
        id: `ORDER-${Date.now()}`,
        customerName: formData.customerName,
        rfc: formData.rfc || undefined,
        email: formData.email,
        phone: formData.phone,
        product: formData.product,
        saleType: formData.saleType,
        quantity: Number(formData.quantity),
        deliveryAddress: formData.deliveryAddress,
        invoiceType: formData.invoiceType,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Agregar pedido a la lista
      onOrderSubmit(newOrder);

      // Simular envío a WhatsApp
      const whatsappMessage = encodeURIComponent(generateWhatsAppMessage());
      const whatsappNumber = '525512345678'; // Número del gerente
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, '_blank');

      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          customerName: '',
          rfc: '',
          email: '',
          phone: '',
          product: 'melaza',
          saleType: 'mayoreo',
          quantity: '',
          deliveryAddress: '',
          invoiceType: 'cfdi'
        });
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error al enviar pedido:', error);
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section id="pedidos" className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Pedido Enviado!</h3>
              <p className="text-gray-600 mb-6">
                Su pedido ha sido enviado exitosamente. Se ha abierto WhatsApp para que pueda 
                confirmar directamente con nuestro gerente.
              </p>
              <div className="text-sm text-gray-500">
                Redirigiendo en unos segundos...
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="pedidos" className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hacer <span className="text-green-700">Pedido</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete el formulario y su pedido será enviado directamente 
            a nuestro gerente vía WhatsApp para confirmación inmediata.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información del Cliente */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre / Razón Social *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    placeholder="Ingrese su nombre o razón social"
                  />
                  {errors.customerName && (
                    <p className="error-message flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RFC {formData.invoiceType === 'cfdi' && '*'}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.rfc}
                    onChange={(e) => setFormData({...formData, rfc: e.target.value.toUpperCase()})}
                    placeholder="Ejemplo: ABC123456XYZ"
                    maxLength={13}
                  />
                  {errors.rfc && (
                    <p className="error-message flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.rfc}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && (
                    <p className="error-message flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="5512345678"
                  />
                  {errors.phone && (
                    <p className="error-message flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Información del Producto */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Producto *
                  </label>
                  <select
                    className="select-field"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value as 'melaza' | 'probiotico'})}
                  >
                    <option value="melaza">Melaza</option>
                    <option value="probiotico">Probióticos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Venta *
                  </label>
                  <select
                    className="select-field"
                    value={formData.saleType}
                    onChange={(e) => setFormData({...formData, saleType: e.target.value as 'mayoreo' | 'menudeo'})}
                  >
                    <option value="mayoreo">Mayoreo</option>
                    <option value="menudeo">Menudeo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad (kg) *
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="1000"
                    min="1"
                  />
                  {errors.quantity && (
                    <p className="error-message flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.quantity}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Dirección de Entrega */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección de Entrega *
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  placeholder="Calle, número, colonia, ciudad, estado, código postal"
                />
                {errors.deliveryAddress && (
                  <p className="error-message flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.deliveryAddress}</span>
                  </p>
                )}
              </div>

              {/* Tipo de Facturación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Facturación *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                    <input
                      type="radio"
                      name="invoiceType"
                      value="cfdi"
                      checked={formData.invoiceType === 'cfdi'}
                      onChange={(e) => setFormData({...formData, invoiceType: e.target.value as 'cfdi' | 'ticket'})}
                      className="text-green-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Factura CFDI</div>
                      <div className="text-sm text-gray-600">Para empresas (requiere RFC)</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                    <input
                      type="radio"
                      name="invoiceType"
                      value="ticket"
                      checked={formData.invoiceType === 'ticket'}
                      onChange={(e) => setFormData({...formData, invoiceType: e.target.value as 'cfdi' | 'ticket'})}
                      className="text-green-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Ticket</div>
                      <div className="text-sm text-gray-600">Para particulares</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Pedido via WhatsApp</span>
                  </>
                )}
              </motion.button>

              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Se abrirá WhatsApp para confirmar su pedido directamente con nuestro gerente</span>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderForm;
