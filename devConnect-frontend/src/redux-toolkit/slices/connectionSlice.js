import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnectionData: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnectionData } = connectionSlice.actions;
export default connectionSlice.reducer;
