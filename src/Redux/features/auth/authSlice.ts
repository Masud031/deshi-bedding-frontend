import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./authTypes";

interface AuthState {
  user: User | null;
}

const loadUser = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const initialState: AuthState = {
  user: loadUser(),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (
      state,
      action: PayloadAction<User | { user: User }>
    ) => {
      const user =
        "user" in action.payload
          ? action.payload.user
          : action.payload;

      state.user = user;

      saveUser(user);
    },

    logout: (state) => {
      state.user = null;
      removeUser();
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;