export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  phone?: string;
  image?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken?: string;
}