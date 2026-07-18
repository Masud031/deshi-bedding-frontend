export interface ProductStock {
  size: string;
  quantity: number;
}

export interface Product {
  _id: string;
  productCode: string;

  name: string;
  description: string;

  category: string;
  color: string;

  image: string,
  price: number;

  rating?: number;
  reviews?: number;

  stock: ProductStock[];

  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  oldPrice?: number;
  badge?: string;

}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    filters: {
      categories: string[];
      colors: string[];
      sizes: string[];
    };
  };
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface GetProductsParams {
  category?: string;
  color?: string;

  priceMin?: string;
  priceMax?: string;

   minPrice:string;
   maxPrice:string;

  page?: number;
  limit?: number;

  search?: string;

  size?: string | string[];

  style?: string;

  styleCategory?: string;
 
}