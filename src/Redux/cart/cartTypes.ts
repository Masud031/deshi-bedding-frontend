export interface CartProduct {
  _id: string;
  productCode: string;

  name: string;
  image: string;

  category: string;

  color?: string;

  selectedSize?: string;

  price: number;

  quantity: number;
}

export interface CartState {
  products: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
}