import React from "react";
import { faHouseMedicalFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const DocMacFreeCaptionLogo = () => {
  return (
    <Link to="/">
    <div className="text-2xl font-bold text-white md:text-3xl">
      <div className="flex pt-4 pl-4 text-center ml-4">
        <span className="text-2xl font-handwriting-caveat">doc</span>
        <FontAwesomeIcon className="w-4 h-4" icon={faHouseMedicalFlag} />
        <span className="text-4xl font-handwriting-pacifico">Mac</span>
      </div>
      <div className="text-sm">Doctor Managed Accountable Clinic</div>
      <div className="shadow-2xl m-4">
        <div className="font-handwriting-pacifico text-[25px] tracking-wide">
          free for ever !
        </div>
      </div>
    </div>
    </Link>
  );
};

export default DocMacFreeCaptionLogo;
