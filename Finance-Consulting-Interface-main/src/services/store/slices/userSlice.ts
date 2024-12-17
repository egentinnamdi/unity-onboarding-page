import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetchingData: false,
  userProfileData: {},
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetchingData: (state, action) => {
      state.isFetchingData = action.payload.isFetching;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
    resetUserSlice: () => initialState,
  },
});

export const {
  setIsFetchingData,
  setAllUsers,
  setUserProfileData,
  resetUserSlice,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
