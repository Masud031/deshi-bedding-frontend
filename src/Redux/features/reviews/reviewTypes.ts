export interface Review {
  _id: string;
  userId: string;
  productId: string;

  rating: number;
  comment: string;

  createdAt: string;
  updatedAt?: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: Review[];
}

export interface ReviewsCountResponse {
  success: boolean;
  totalReviews: number;
}

export interface CreateReviewPayload {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}