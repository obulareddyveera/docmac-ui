import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWebWhatsappQrCodeAsync,
  getWebWhatsappStateAsync,
  setLogoutWebWhatsappAsync,
} from "./slice";

const WebWhatsapp = () => {
  const dispatch = useDispatch();
  const webWhatsappStore = useSelector((state) => state.webWhatsapp);
  const { clinic } = useSelector((state) => state.auth);
  const { qrCode, error, status, state } = webWhatsappStore;

  useEffect(() => {
    if (clinic && clinic.id && clinic.mobile) {
      dispatch(
        getWebWhatsappStateAsync(`docMac${clinic.id}Id${clinic.mobile}`)
      );
    }
  }, [clinic]);

  const refreshQrCode = () => {
    dispatch(getWebWhatsappQrCodeAsync(`docMac${clinic.id}Id${clinic.mobile}`));
  };

  const handleLogout = () => {
    dispatch(setLogoutWebWhatsappAsync(`docMac${clinic.id}Id${clinic.mobile}`));
  };

  const getQrCodeOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <button
          className="btn btn-warning text-white w-full m-4"
          onClick={refreshQrCode}
        >
          Generate Whatsapp QR - code
        </button>
      </div>
    );
  };

  const getQrCodeInitOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <div className="m-4 border-b-2 border-white p-2">
          <h2 className="card-title font-specimen-oswald-wght-300">
            Scan the whatsapp QR - Code
          </h2>
        </div>
        <p>{"Use clinic register mobile number to scan the QRCode"}</p>
      </div>
    );
  };

  const getQrCodeRefreshOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <p>{error || `QR - code is not valid, refresh the QR - code`}</p>
        <button
          className="btn btn-warning text-white w-full m-4"
          onClick={refreshQrCode}
        >
          Refresh the QR - code
        </button>
      </div>
    );
  };

  const getContinueOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <button
          className="btn btn-warning text-white w-full m-4"
          onClick={handleLogout}
        >
          Log-out
        </button>
      </div>
    );
  };

  const getSpinnerOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <div className="m-4 border-b-2 border-white p-2">
          <h2 className="card-title font-specimen-oswald-wght-300">
            Whatsapp QR - Code, in progress
          </h2>
        </div>
        <p>{"QR - Code generation in progress, this may take 2 to 3 minutes of time."}</p>
      </div>
    )
  }

  console.log("--== WebWhatsapp ", state);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="flex justify-center items-center">
          <div className="card w-96 bg-white shadow-xl">
            <figure>
              {qrCode && state !== "CONNECTED" ? (
                <img src={qrCode} alt="Whatsapp QRCode" />
              ) : (
                <>
                  {state === "NOT_CONNECTED" && (
                    <img
                      src={"/banners/notConnected.png"}
                      alt="Refresh the QR-Code"
                    />
                  )}
                  {state === "REFRESH" && (
                    <img
                      src={"/banners/refresh_the_qr_code.png"}
                      alt="Refresh the QR-Code"
                    />
                  )}
                  {state === "CONNECTED" && (
                    <img
                      src={"/banners/connected.png"}
                      alt="Refresh the QR-Code"
                    />
                  )}
                  {!state && (
                    <>
                      <div className="flex items-center justify-center p-[5rem]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-24 h-24 text-portalBg animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </>
              )}
            </figure>
            <div className="card-body bg-base-100">
              {state === "NOT_CONNECTED" && getQrCodeOtions()}
              {state === "INIT" && getQrCodeInitOtions()}
              {state === "REFRESH" && getQrCodeRefreshOtions()}
              {state === "CONNECTED" && getContinueOtions()}
              {!state && getSpinnerOtions()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebWhatsapp;
