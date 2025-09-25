import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  Eye,
  MapPin,
  Calendar,
  FileText,
  User
} from 'lucide-react';
import { Order } from '../types';

interface AdminPanelProps {
  orders: Order[];
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  orders, 
  updateOrder, 
  isLoggedIn, 
  setIsLoggedIn 
}) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciales de demostración
    if (loginData.username === 'gerente' && loginData.password === 'melaza2025') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciales incorrectas. Use: gerente / melaza2025');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_route': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'in_route': return 'En Ruta';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const estimateDelivery = (address: string): string => {
    // Simulación de estimación de entrega basada en la dirección
    const baseDate = new Date();
    const stateDeliveryTimes: { [key: string]: number } = {
      'cdmx': 1,
      'mexico': 1,
      'guadalajara': 2,
      'monterrey': 3,
      'tijuana': 4,
      'merida': 3,
      'puebla': 1,
      'queretaro': 2
    };

    let deliveryDays = 2; // Default
    const addressLower = address.toLowerCase();
    
    for (const [state, days] of Object.entries(stateDeliveryTimes)) {
      if (addressLower.includes(state)) {
        deliveryDays = days;
        break;
      }
    }

    baseDate.setDate(baseDate.getDate() + deliveryDays);
    return baseDate.toLocaleDateString('es-MX');
  };

  const suggestRoute = (address: string): string => {
    // Simulación de sugerencia de ruta
    const routes = {
      'cdmx': 'Ruta Centro - CDMX Direct',
      'guadalajara': 'Ruta Occidente - Guadalajara Hub',
      'monterrey': 'Ruta Norte - Monterrey Distribution',
      'tijuana': 'Ruta Pacífico - Tijuana Border',
      'merida': 'Ruta Sureste - Mérida Peninsula'
    };

    const addressLower = address.toLowerCase();
    for (const [location, route] of Object.entries(routes)) {
      if (addressLower.includes(location)) {
        return route;
      }
    }
    return 'Ruta General - Distribución Nacional';
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 rounded-xl w-fit mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Melaza Tiznado & Logística HT</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                className="input-field"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                className="input-field"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Iniciar Sesión
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>Demo: gerente / melaza2025</p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Gestión de Pedidos - Melaza Tiznado</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bienvenido, Gerente</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="btn-secondary text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Pedidos', value: orders.length, icon: Package, color: 'blue' },
          { label: 'Pendientes', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'yellow' },
          { label: 'En Ruta', value: orders.filter(o => o.status === 'in_route').length, icon: Truck, color: 'purple' },
          { label: 'Entregados', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle, color: 'green' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Orders Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Gestión de Pedidos</h2>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay pedidos registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.product === 'melaza' ? 'Melaza' : 'Probióticos'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.saleType === 'mayoreo' ? 'Mayoreo' : 'Menudeo'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{order.quantity} kg</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('es-MX')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Detalle del Pedido</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Información del Cliente</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nombre:</span> {selectedOrder.customerName}</p>
                    {selectedOrder.rfc && <p><span className="font-medium">RFC:</span> {selectedOrder.rfc}</p>}
                    <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                    <p><span className="font-medium">Teléfono:</span> {selectedOrder.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Detalles del Producto</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Producto:</span> {selectedOrder.product === 'melaza' ? 'Melaza' : 'Probióticos'}</p>
                    <p><span className="font-medium">Tipo:</span> {selectedOrder.saleType === 'mayoreo' ? 'Mayoreo' : 'Menudeo'}</p>
                    <p><span className="font-medium">Cantidad:</span> {selectedOrder.quantity} kg</p>
                    <p><span className="font-medium">Facturación:</span> {selectedOrder.invoiceType === 'cfdi' ? 'CFDI' : 'Ticket'}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Información de Entrega</span>
                </h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedOrder.deliveryAddress}
                </p>
              </div>

              {/* Status Management */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Estado del Pedido</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['pending', 'confirmed', 'in_route', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrder(selectedOrder.id, { status: status as Order['status'] })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        selectedOrder.status === status
                          ? getStatusColor(status as Order['status'])
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {getStatusLabel(status as Order['status'])}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logistics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Fecha Estimada de Entrega</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      className="input-field text-sm"
                      value={selectedOrder.estimatedDelivery || ''}
                      onChange={(e) => updateOrder(selectedOrder.id, { estimatedDelivery: e.target.value })}
                    />
                    <button
                      onClick={() => updateOrder(selectedOrder.id, { 
                        estimatedDelivery: estimateDelivery(selectedOrder.deliveryAddress) 
                      })}
                      className="btn-secondary text-xs px-3 py-2"
                    >
                      Auto
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Ruta Asignada</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="input-field text-sm"
                      value={selectedOrder.route || ''}
                      onChange={(e) => updateOrder(selectedOrder.id, { route: e.target.value })}
                      placeholder="Asignar ruta..."
                    />
                    <button
                      onClick={() => updateOrder(selectedOrder.id, { 
                        route: suggestRoute(selectedOrder.deliveryAddress) 
                      })}
                      className="btn-secondary text-xs px-3 py-2"
                    >
                      Sugerir
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Notas Adicionales</span>
                </h4>
                <textarea
                  className="input-field text-sm"
                  rows={3}
                  value={selectedOrder.notes || ''}
                  onChange={(e) => updateOrder(selectedOrder.id, { notes: e.target.value })}
                  placeholder="Agregar notas sobre el pedido..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    // Simular facturación
                    alert('Factura generada exitosamente');
                  }}
                  className="btn-primary"
                >
                  Generar Factura
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
