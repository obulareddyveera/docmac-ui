import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_SLICE_STATE, fetchTokenDetails } from "../../features/auth/auth.slice";
import NavbarLogo from "../logo/navbar";
import MenuOptions from "./menu";
import NavbarComponent from "./navbar";
import NotifyElement from "./notify";

const LayoutTemplate = ({ children }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.status === AUTH_SLICE_STATE.AUTH_SLICE_TOKEN_INVALID) {
      navigate('/login')
    } else if (auth.status === AUTH_SLICE_STATE.AUTH_SLICE_TOKEN_INIT) {
      dispatch(fetchTokenDetails())
    }
  }, [auth])
  return (
    <>
      <div className="hidden md:flex">
        <div className="w-1/6 bg-portalBg flex flex-col">
          <div className="flex items-center justify-center text-white px-5 py-4">
            <NavbarLogo />
          </div>
          <div className="flex flex-col justify-between h-screen bg-portalBg border-r">
            <div className="px-3 py-6">
              <React.StrictMode>
                <MenuOptions />
              </React.StrictMode>
            </div>
          </div>
        </div>
        <div className="w-10/12 bg-gray-200">
          <NotifyElement />
          <React.StrictMode>{children}</React.StrictMode>
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <NavbarComponent />
        <div className="w-full bg-gray-200">
          <NotifyElement />
          <React.StrictMode>{children}</React.StrictMode>
        </div>
      </div>
    </>
  );
};

export default LayoutTemplate;
