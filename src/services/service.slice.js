import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  code: 200,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    spinner: (state, action) => {
      return {
        ...state,
        status: action.payload.status,
        code: action.payload.code,
      };
    },
  },
});

export const { spinner } = serviceSlice.actions;
export default serviceSlice.reducer;
