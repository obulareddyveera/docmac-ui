import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWebWhatsappQrCodeAsync } from "./slice";

const WebWhatsapp = () => {
  const dispatch = useDispatch();
  const webWhatsappStore = useSelector((state) => state.webWhatsapp);
  console.log("---== WebWhatsapp ==--", webWhatsappStore);
  useEffect(() => {
    refreshQrCode();
  }, []);
  const refreshQrCode = () => {
    dispatch(getWebWhatsappQrCodeAsync());
  };

  const { qrCode, error } = webWhatsappStore;
  console.log("---== WebWhatsapp ==--", qrCode);
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="flex justify-center items-center">
          <div class="card w-96 bg-white shadow-xl">
            <figure>
                {
                    qrCode ? (
                        <img src={qrCode} alt="Whatsapp QRCode" />
                    ) : (
                        <img src={'/banners/refresh_the_qr_code.png'} alt="Refresh the QR-Code" />
                    )
                }
              
            </figure>
            <div class="card-body bg-base-100">
              <div className="flex flex-col justify-center items-center text-white">
                <div className="m-4 border-b-2 border-white p-2">
                  <h2 class="card-title font-specimen-oswald-wght-300">
                    Scan the whatsapp QR - Code
                  </h2>
                </div>
                <p>
                  {error ||
                    "Use clinic register mobile number to scan the QRCode"}
                </p>
                <button
                  class="btn btn-warning text-white w-full m-4"
                  onClick={refreshQrCode}
                >
                  Refresh the QR - code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebWhatsapp;
