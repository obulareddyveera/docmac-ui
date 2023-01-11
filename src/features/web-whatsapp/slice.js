import {
  createAsyncThunk,
  createSlice,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { DOCMAC_API_URL } from "../../config";

console.log('--== DOCMAC_API_URL ', DOCMAC_API_URL);

const initialState = {
  status: null,
  qrCode: null,
  error: null,
};

export const WEB_WHATSAPP_SLICE_STATE = {
  WEB_WHATSAPP_FETCH_QRCODE_PENDING: "WEB_WHATSAPP_FETCH_QRCODE_PENDING",
  WEB_WHATSAPP_FETCH_QRCODE_FULLFILLED: "WEB_WHATSAPP_FETCH_QRCODE_FULLFILLED",
  WEB_WHATSAPP_FETCH_QRCODE_REJECTED: "WEB_WHATSAPP_FETCH_QRCODE_REJECTED",
};

export const authSlice = createSlice({
  name: "webWhatsapp",
  initialState,
  reducers: {
    resetItem: () => {
      return {
        status: null,
        qrCode: null,
        error: null,
        state: "NOT_CONNECTED",
      };
    },
    setWhatsappClientIdReadyState: (state, action) => {
      return {
        ...state,
        state: "READy",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWebWhatsappQrCodeAsync.pending, () => {
        return {
          status: WEB_WHATSAPP_SLICE_STATE.WEB_WHATSAPP_FETCH_QRCODE_PENDING,
          qrCode: null,
          error: null,
        };
      })
      .addCase(getWebWhatsappQrCodeAsync.rejected, () => {
        return {
          status: WEB_WHATSAPP_SLICE_STATE.WEB_WHATSAPP_FETCH_QRCODE_REJECTED,
          qrCode: null,
          error: null,
        };
      })
      .addCase(getWebWhatsappQrCodeAsync.fulfilled, (state, action) => {
        const { qrCode, error, clientId } = action.payload.qrCode;
        return {
          ...state,
          status: null,
          clientId,
          error: qrCode ? null : error,
          qrCode: qrCode,
          state: qrCode ? "INIT" : "REFRESH",
        };
      })
      .addCase(setLogoutWebWhatsappAsync.fulfilled, (state, action) => {
        return {
          status: null,
          error: null,
          qrCode: null,
          state: "NOT_CONNECTED",
        };
      })
      .addCase(getWebWhatsappStateAsync.fulfilled, (state, action) => {
        return {
          ...state,
          state: action.payload.state,
        };
      })
      .addCase(pollWhatsappClientIdStatus.fulfilled, (state, action) => {
        return {
          ...state,
          state: action.payload.whatsappWebClient ? "CONNECTED" : state.state,
        };
      });
  },
});

//**  */
export const getWebWhatsappQrCodeAsync = createAsyncThunk(
  `webWhatsappQrCodeAsync`,
  async (clientId) => {
    return await fetch(
      `${DOCMAC_API_URL}/api/web-whatsapp/qrcode/${clientId}?&timestamp=${new Date().getTime()}`
    ).then((response) => response.json());
  }
);
export const setLogoutWebWhatsappAsync = createAsyncThunk(
  `logoutWebWhatsappAsync`,
  async (clientId) => {
    return await fetch(
      `${DOCMAC_API_URL}/api/web-whatsapp/qrcode/${clientId}/logout?&timestamp=${new Date().getTime()}`
    ).then((response) => response.json());
  }
);
export const getWebWhatsappStateAsync = createAsyncThunk(
  `webWhatsappStateAsync`,
  async (clientId) => {
    return await fetch(
      `${DOCMAC_API_URL}/api/web-whatsapp/qrcode/${clientId}/state?&timestamp=${new Date().getTime()}`
    ).then((response) => response.json());
  }
);
export const pollWhatsappClientIdStatus = createAsyncThunk(
  `pollWhatsappClientIdStatus`,
  async (clientId) => {
    return await fetch(
      `${DOCMAC_API_URL}/api/web-whatsapp/qrcode/${clientId}/poll/state?&timestamp=${new Date().getTime()}`
    ).then((response) => response.json());
  }
);

export const { resetItem, setWhatsappClientIdReadyState } = authSlice.actions;
export const pollWhatsappClientIdStatusMiddleware = createListenerMiddleware();
pollWhatsappClientIdStatusMiddleware.startListening({
  type: "webWhatsappQrCodeAsync/fulfilled",
  effect: async (action, listenerApi) => {
    const {webWhatsapp} = listenerApi.getState()
    if (webWhatsapp && webWhatsapp.qrCode && webWhatsapp.state === "INIT" && webWhatsapp.clientId) {
      listenerApi.dispatch(pollWhatsappClientIdStatus(webWhatsapp.clientId))
    }
  },
});
pollWhatsappClientIdStatusMiddleware.startListening({
  type: "pollWhatsappClientIdStatus/fulfilled",
  effect: async (action, listenerApi) => {
    const {webWhatsapp} = listenerApi.getState()
    if (webWhatsapp && webWhatsapp.qrCode && webWhatsapp.state === "INIT" && webWhatsapp.clientId) {
      setTimeout(() => {
        listenerApi.dispatch(pollWhatsappClientIdStatus(webWhatsapp.clientId))
      }, 5000)
    }
  },
});

export default authSlice.reducer;
