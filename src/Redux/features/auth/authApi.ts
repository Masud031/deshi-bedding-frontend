import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



import type {
  AuthResponse,
  EditProfileRequest,
  LoginRequest,
  RegisterRequest,
  UpdateRoleRequest,
  User,
} from "./authTypes";
import { getBaseUrl } from "@/utils/baseurl";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    //  baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),

      invalidatesTags: ["User"],
    }),

    // Login
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Logout
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      invalidatesTags: ["User"],
    }),

    // Get All Users
    getUsers: builder.query<User[], void>({
      query: () => "/users",

      providesTags: ["User"],
    }),

    // Delete User
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),

    // Update User Role
    updateUserRole: builder.mutation<AuthResponse, UpdateRoleRequest>({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),

      invalidatesTags: ["User"],
    }),

    // Edit Profile
    editProfile: builder.mutation<AuthResponse, EditProfileRequest>({
      query: ({ id, profileData }) => ({
        url: `/edit-profile/${id}`,
        method: "PATCH",
        body: profileData,
      }),

      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;