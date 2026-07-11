export interface OrderProduct {
  productId: string;
  productCode: string;

  name: string;

  category: string;

  color?: string;

  image: string;

  size?: string;

  quantity: number;

  price: number;

  totalPrice?: number;
}

export interface CreateOrderPayload {
  fullName: string;
  address: string;
  district: string;
  zipCode?: string;
  phone: string;

  paymentMethod: string;

  totalPrice: number;

  userId?: string;

  deliveryMethod?: string;

  deliveryStatus?: string;

  paymentStatus?: string;

  products: OrderProduct[];
}

export interface Order {
  _id: string;

  orderId: string;

  fullName: string;

  address: string;

  district: string;

  zipCode?: string;

  phone: string;

  paymentMethod: string;

  totalPrice: number;

  status: string;

  transactionId: string;

  createdAt: string;

  products: OrderProduct[];
}