import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name : "auth",
  initialState: {
    user: localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null,
    registerMessage: null,
    isEmailVerified: false,
  },
  reducers:{
    register(state,action) {
         state.registerMessage = action.payload;
      },
  }
  
})

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer }