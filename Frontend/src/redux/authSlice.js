import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: userFromStorage || null,
  },
  reducers: {
    //action - all are function
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user from API responce
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },
});

export const { setLoading ,loginStart,loginSuccess,logout,updateUser} = authSlice.actions;
export default authSlice.reducer;
