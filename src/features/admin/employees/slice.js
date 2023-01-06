import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ServiceBase from "../../../services/index";
import { DOCMAC_API_URL } from "../../../config";
import { buildApiEmployeePayload } from "./utils";
const initialState = {
  status: "",
  item: {},
  data: {},
};

export const EMPLOYEE_SLICE_STATE = {
  POST_API_EMPLOYEE_FULLFILLED: "POST_API_EMPLOYEE_FULLFILLED",
  PUT_API_EMPLOYEE_FULLFILLED: "PUT_API_EMPLOYEE_FULLFILLED",
  GET_ALL_API_EMPLOYEE_FULLFILLED: "GET_ALL_API_EMPLOYEE_FULLFILLED",
  GET_PERSON_API_EMPLOYEE_FULLFILLED: "GET_PERSON_API_EMPLOYEE_FULLFILLED",
};

export const authSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetItem: (state) => {
      state.status = EMPLOYEE_SLICE_STATE.GET_ALL_API_EMPLOYEE_FULLFILLED;
      state.item = {};
      state.errorslice = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEmployeeAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.status = EMPLOYEE_SLICE_STATE.POST_API_EMPLOYEE_FULLFILLED;
        state.item = data.item;
        state.errorslice = data.error;
      })
      .addCase(putEmployeeAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.status = EMPLOYEE_SLICE_STATE.PUT_API_EMPLOYEE_FULLFILLED;
        state.item = data.item;
        state.errorslice = data.error;
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.status = EMPLOYEE_SLICE_STATE.GET_ALL_API_EMPLOYEE_FULLFILLED;
        state.data = data;
        state.errorslice = data.error;
      })
      .addCase(fetchPersonByIdAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.status = EMPLOYEE_SLICE_STATE.GET_PERSON_API_EMPLOYEE_FULLFILLED;
        state.item = data.item;
        state.errorslice = data.error;
      });
  },
});
//**  */
export const postEmployeeAsync = createAsyncThunk(
  `postEmployeeAsync`,
  async (params) => {
    const paylaod = buildApiEmployeePayload(params)
    return await ServiceBase.post(`${DOCMAC_API_URL}/api/employee`, paylaod);
  }
);
export const putEmployeeAsync = createAsyncThunk(
  `putEmployeeAsync`,
  async (params) => {
    const paylaod = buildApiEmployeePayload(params)
    return await ServiceBase.put(`${DOCMAC_API_URL}/api/employee/${params.id}`, paylaod);
  }
);
export const fetchAsync = createAsyncThunk(
  `getApiEmployee`,
  async () => await ServiceBase.get(`${DOCMAC_API_URL}/api/employee`)
);
export const fetchPersonByIdAsync = createAsyncThunk(
  `getPersonById`,
  async (personId) =>
    await ServiceBase.get(`${DOCMAC_API_URL}/api/employee/${personId}`)
);

export const { resetItem } = authSlice.actions;

export default authSlice.reducer;
