import Axios from "axios";
import { spinner } from "./service.slice";
import { DOCMAC_API_URL } from "../config";

const interceptor = (store) => {
  Axios.interceptors.request.use(
    (req) => {
      if (sessionStorage.getItem("docMacTokens")) {
        const docMacTokens = JSON.parse(sessionStorage.getItem("docMacTokens"));
        req.headers["Authorization"] = `Bearer ${docMacTokens.accessToken}`;
      }
      store.dispatch(spinner({ status: "progress", code: 100 }));
      return req;
    },
    (error) => {
      store.dispatch(spinner({ status: "error", code: 500 }));
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (next) => {
      const { data } = next;
      if (data && data.tokens) {
        sessionStorage.setItem("docMacTokens", JSON.stringify(data.tokens));
      }
      store.dispatch(spinner({ status: "success", code: 200 }));
      return Promise.resolve(next);
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const docMacTokens = JSON.parse(sessionStorage.getItem("docMacTokens"));
        const refreshTokenResp = await fetch(`${DOCMAC_API_URL}/auth/refresh`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personId: "1",
            refreshToken: docMacTokens.refreshToken,
          }),
        }).then((response) => response.json());
        const { accessToken } = refreshTokenResp;
        sessionStorage.setItem(
          "docMacTokens",
          JSON.stringify({ ...docMacTokens, accessToken })
        );
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        return Axios(originalRequest);
      } else {
        store.dispatch(
          spinner({ status: "error", code: error.response.status })
        );
        return Promise.reject(error);
      }
    }
  );
};
export default {
  interceptor,
};
