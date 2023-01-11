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
  }

  const getQrCodeOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <div className="m-4 border-b-2 border-white p-2">
          <h2 className="card-title font-specimen-oswald-wght-300">
            Scan the whatsapp QR - Code
          </h2>
        </div>
        <p>{"Use clinic register mobile number to scan the QRCode"}</p>
        <button
          className="btn btn-warning text-white w-full m-4"
          onClick={refreshQrCode}
        >
          Generate QR - code
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
  }

  const getQrCodeRefreshOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <div className="m-4 border-b-2 border-white p-2">
          <h2 className="card-title font-specimen-oswald-wght-300">
            Scan the whatsapp QR - Code
          </h2>
        </div>
        <p>{error}</p>
        <button
          className="btn btn-warning text-white w-full m-4"
          onClick={refreshQrCode}
        >
          Refresh the QR - code
        </button>
      </div>
    );
  }

  const getContinueOtions = () => {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <button className="btn btn-success text-white w-full m-4">
          Continue
        </button>
        <button className="btn btn-warning text-white w-full m-4" onClick={handleLogout}>
          Log-out
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="flex justify-center items-center">
          <div className="card w-96 bg-white shadow-xl">
            <figure>
              {qrCode ? (
                <img src={qrCode} alt="Whatsapp QRCode" />
              ) : (
                <img
                  src={"/banners/refresh_the_qr_code.png"}
                  alt="Refresh the QR-Code"
                />
              )}
            </figure>
            <div className="card-body bg-base-100">
              {state === "NOT_CONNECTED" && getQrCodeOtions()}
              {state === "INIT" && getQrCodeInitOtions()}
              {state === "REFRESH" && getQrCodeRefreshOtions()}
              {state === "CONNECTED" && getContinueOtions()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebWhatsapp;
