import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 🔹 Foydalanuvchini tizimga kiritish
    login: (state, { payload }) => {
      state.user = payload;
      state.authReady = true;
    },

    // 🔹 Foydalanuvchini tizimdan chiqarish
    logout: (state) => {
      state.user = null;
      state.authReady = true;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
