import { getBaseUrl } from "@/utils/baseurl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    registerUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    loginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    editProfile: builder.mutation<any, { id: string; profileData: FormData }>({
      query: ({ id, profileData }) => ({
        url: `/edit-profile/${id}`,
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["Users"],
    }),

    getUsers: builder.query<any, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    deleteUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUserRole: builder.mutation<
      any,
      { userId: string; role: string }
    >({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useEditProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = authApi;