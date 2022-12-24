import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ServiceBase from "../../services/index";
import { DOCMAC_API_URL } from "../../config";
const initialState = {
  status: "",
  person: {},
  clinic: {},
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkDuplicateEmailAsync.fulfilled, (state, action) => {
        const { data, query } = action.payload.data;
        state.duplicateEmails = [...data];
      })
      .addCase(registerClinicAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.person = data.person;
        state.clinic = data.clinic;
      })
      .addCase(loginClinicAsync.pending, (state, action) => {
        state.exception = undefined;
      })
      .addCase(loginClinicAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.exception = undefined;
        state.person = data.person;
        state.clinic = data.clinic;
      })
      .addCase(loginClinicAsync.rejected, (state, action) => {
        state.exception = action.error;
      });
  },
});

export const checkDuplicateEmailAsync = createAsyncThunk(
  `/auth/duplicate/email`,
  async (payload) => {
    const data = await ServiceBase.get(
      `${DOCMAC_API_URL}/auth/duplicate/email?` +
        new URLSearchParams({
          email: payload,
        })
    );

    return data;
  }
);

export const registerClinicAsync = createAsyncThunk(
  "/auth/register",
  async (payload) => {
    const data = await ServiceBase.post(
      `${DOCMAC_API_URL}/auth/register`,
      payload
    );

    return data;
  }
);

export const loginClinicAsync = createAsyncThunk(
  "/auth/login",
  async (payload) => {
    const data = await ServiceBase.post(
      `${DOCMAC_API_URL}/auth/login`,
      payload
    );

    return data;
  }
);
export const { registerClinic, checkDuplicateEmail } = authSlice.actions;
export default authSlice.reducer;
