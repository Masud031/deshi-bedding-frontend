
export interface LoginRequest {
  password: string;

  email?: string;
  mobile?: string;
}
export interface RegisterRequest {
  username: string;
  password: string;

  email?: string;
  mobile?: string;

  provider?: string;
  profileImage?: string;
}

export interface User {
  _id: string;
  username: string;

  email?: string;
  mobile?: string;

  role: "admin" | "user";

  profileImage?: string;
  bio?: string;
  profession?: string;
}


export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface UpdateRoleRequest {
  userId: string;
  role: "admin" | "user";
}

export interface EditProfileRequest {
  id: string;
  profileData: FormData;
}
export interface GetUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User[];
}