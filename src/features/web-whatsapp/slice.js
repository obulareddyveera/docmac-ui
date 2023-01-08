import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ServiceBase from "../../services/index";
import { DOCMAC_API_URL } from "../../config";

const initialState = {
  status: "",
  qrCode: null,
  errorslice: {},
};

export const WEB_WHATSAPP_SLICE_STATE = {
  WEB_WHATSAPP_QRCODE_SLICE_STATE: "WEB_WHATSAPP_QRCODE_SLICE_STATE",
  WEB_WHATSAPP_INIT_SLICE_STATE: "WEB_WHATSAPP_INIT_SLICE_STATE",
};

export const authSlice = createSlice({
  name: "webWhatsapp",
  initialState,
  reducers: {
    resetItem: (state) => {
      state.status = WEB_WHATSAPP_SLICE_STATE.WEB_WHATSAPP_INIT_SLICE_STATE;
      state.qrCode = null;
      state.errorslice = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWebWhatsappQrCodeAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        return {
            ...state,
            status: WEB_WHATSAPP_SLICE_STATE.POST_API_EMPLOYEE_FULLFILLED,
            errorslice: data.error,
            ...data.qrCode
        }
      })
  },
});
//**  */
export const getWebWhatsappQrCodeAsync = createAsyncThunk(
  `webWhatsappQrCodeAsync`,
  async () => {
    return await ServiceBase.get(`${DOCMAC_API_URL}/api/web-whatsapp/qrcode`);
  }
);

export const { resetItem } = authSlice.actions;

export default authSlice.reducer;
