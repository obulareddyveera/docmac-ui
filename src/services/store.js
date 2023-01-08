import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import serviceReducer from "./service.slice";
import authReducer from "../features/auth/auth.slice";
import employeeReducer from "../features/admin/employees/slice";
import webWhatsappReducer from "../features/web-whatsapp/slice";
import serviceInterceptor from "./service.interceptor";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    employee: employeeReducer,
    webWhatsapp: webWhatsappReducer,
    service: serviceReducer,
  },
});

serviceInterceptor.interceptor(store);
