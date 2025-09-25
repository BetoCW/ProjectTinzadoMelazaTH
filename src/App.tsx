import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Order } from './types';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    ));
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/admin" element={
          <AdminPanel 
            orders={orders}
            updateOrder={updateOrder}
            isLoggedIn={isAdminLoggedIn}
            setIsLoggedIn={setIsAdminLoggedIn}
          />
        } />
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Products />
            <OrderForm onOrderSubmit={addOrder} />
            <Contact />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
