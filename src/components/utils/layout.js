import React from "react";
import NavbarLogo from "../logo/navbar";
import MenuOptions from "./menu";
import NavbarComponent from "./navbar";

const LayoutTemplate = ({ children }) => {
  return (
    <>
      <div className="hidden md:flex">
        <div className="w-1/6 bg-portalBg">
          <div className="flex items-center justify-center text-white px-3 py-4">
            <NavbarLogo />
          </div>
          <div className="flex flex-col justify-between h-screen bg-portalBg border-r">
            <div className="px-3 py-6">
              <MenuOptions />
            </div>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <div className="flex flex-col md:hidden">
        <NavbarComponent />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default LayoutTemplate;
