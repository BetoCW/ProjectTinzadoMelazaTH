export interface Order {
  id: string;
  customerName: string;
  rfc?: string;
  email: string;
  phone: string;
  product: 'melaza' | 'probiotico';
  saleType: 'mayoreo' | 'menudeo';
  quantity: number;
  deliveryAddress: string;
  invoiceType: 'cfdi' | 'ticket';
  status: 'pending' | 'confirmed' | 'in_route' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery?: string;
  route?: string;
  notes?: string;
}

export interface FormData {
  customerName: string;
  rfc: string;
  email: string;
  phone: string;
  product: 'melaza' | 'probiotico';
  saleType: 'mayoreo' | 'menudeo';
  quantity: string;
  deliveryAddress: string;
  invoiceType: 'cfdi' | 'ticket';
}

export interface ValidationErrors {
  [key: string]: string;
}
