export interface OrderProduct {
   productId: {
    _id: string;
    productCode: string;
    name: string;
    image: string;
  };
 
  category: string;

  color?: string;
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

  email?: string;

  address: string;

  district: string;

  zipCode?: string;

  phone: string;

  paymentMethod: string;

  totalPrice: number;

  status: string;

  transactionId: string;

  createdAt: string;

  updatedAt?: string;

  products: OrderProduct[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order[];
}