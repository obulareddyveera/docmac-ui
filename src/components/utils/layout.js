import React from "react";
import NavbarLogo from "../logo/navbar";
import MenuOptions from "./menu";
import NavbarComponent from "./navbar";
import NotifyElement from "./notify";

const LayoutTemplate = ({ children }) => {
  return (
    <>
      <div className="hidden md:flex">
        <div className="w-1/6 bg-portalBg flex flex-col justify-between">
          <div className="flex items-center justify-center text-white px-5 py-4">
            <NavbarLogo />
          </div>
          <div className="flex flex-col justify-between h-screen bg-portalBg border-r">
            <div className="px-3 py-6">
              <MenuOptions />
            </div>
          </div>
        </div>
        <div className="w-10/12 bg-gray-200">
          <NotifyElement />
          {children}
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <NavbarComponent />
        <div className="w-full bg-gray-200">
          <NotifyElement />
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutTemplate;
