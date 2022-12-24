import { faHouseMedicalFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NavbarLogo = () => {
  return (
    <>
    <div className="flex flex-col">
    <div className="flex pt-2">
      <span className="text-2xl font-handwriting-caveat">doc</span>
      <FontAwesomeIcon className="w-4 h-4" icon={faHouseMedicalFlag} />
      <span className="text-4xl font-handwriting-pacifico">Mac</span>
    </div>
    <div className="text-[9px]">Doctor Managed Accountable Clinic</div>
    </div>
    </>
  );
};

export default NavbarLogo;
