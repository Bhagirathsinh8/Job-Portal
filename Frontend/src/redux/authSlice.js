import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

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
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user

    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
    },
  },
});

export const { setLoading ,loginStart,loginFail,loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;
