import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarLogo from "../logo/navbar";
import MenuOptions from "./menu";

const NavbarComponent = () => {
  return (
    <>
      <div className="navbar bg-portalBg">
        <div className="text-white w-full flex">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <FontAwesomeIcon className="h-5 w-5" icon={faBars} />
            </label>
            <div
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-portalBg rounded-box w-52"
            >
              <MenuOptions />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <NavbarLogo />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
