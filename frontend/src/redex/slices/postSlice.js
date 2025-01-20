import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name : "post",
  initialState: {
    posts: [],
    post: null
  },
  reducers:{
    setPosts(state,action) {
         state.posts = action.payload;
      },
    setPost(state,action) {
         state.post = action.payload;
      },
  }
  
})

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer }