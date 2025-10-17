import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequestData: (state, action) => {
      return action.payload;
    },
    removeUserData: (state, action) => {
      return null;
    },
  },
});

export const { addRequestData, removeUserData } = requestSlice.actions;
export default requestSlice.reducer;
