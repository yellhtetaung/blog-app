import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    SIGN_IN: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    SIGN_OUT: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { SIGN_IN, SIGN_OUT } = authSlice.actions;

export default authSlice.reducer;
