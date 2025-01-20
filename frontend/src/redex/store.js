import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice.js";
import {postReducer} from "./slices/postSlice.js";
import {categoryReducer} from "./slices/categorySlice.js";

const store = configureStore({
  reducer:{
    auth:authReducer,
    post:postReducer,
    category:categoryReducer
  }
})

export default store;