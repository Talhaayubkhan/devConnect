import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequestData: (state, action) => {
      return action.payload;
    },
  },
});

export const { addRequestData } = requestSlice.actions;
export default requestSlice.reducer;
