import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name : "profile",
  initialState: {
    profile: {},
    
  },
  reducers:{
    setProfile(state,action) {
         state.profile = action.payload;
      },
  }
  
})

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer }