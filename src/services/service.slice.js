import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  code: 200,
  notify: {},
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
    notify: (state, action) => {
      return {
        ...state,
        notify: {
          status: action.payload.status,
          message: action.payload.message,
          kickStartTime: action.payload.kickStartTime,
          className: action.payload.className,
          icon: action.payload.icon,
        }
      };
    }
  },
});

export const { spinner, notify } = serviceSlice.actions;
export default serviceSlice.reducer;
