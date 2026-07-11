export interface MonthlyEarning {
  month: number;
  year: number;
  earnings: number;
}

// -------------------
// Admin
// -------------------

export interface AdminStatsData {
  totalOrders: number;
  totalProducts: number;
  totalReviews: number;
  totalUsers: number;
  totalEarnings: number;
  monthlyEarnings: MonthlyEarning[];
}

// -------------------
// User
// -------------------

export interface PurchaseInfo {
  _id: string;
  orderId: string;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface UserStatsData {
  totalPayments: number;
  totalReviews: number;
  totalPurchadedProducts: number;
  purchaseInfo: PurchaseInfo[];
}

export interface UserStats {
  success: boolean;
  message: string;
  data: UserStatsData;
}