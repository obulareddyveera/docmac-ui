import {
  faArrowDown,
  faArrowDown19,
  faArrowRightFromBracket,
  faArrowUp,
  faCaretDown,
  faCaretUp,
  faCashRegister,
  faDesktopAlt,
  faGear,
  faUserEdit,
  faUserNinja,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const MenuOptions = () => {
  const getNavLink = (opt) => (
    <Link
      to={opt.link}
      className={`flex items-center px-4 py-3 cursor-pointer rounded-lg text-white hover:text-rose-50 ${
        opt.isActive ? " bg-success hover:bg-emerald-300" : "hover:bg-info"
      }`}
    >
      
      <FontAwesomeIcon icon={opt.icon} className="w-5 h-5 opacity-75" />
      <span className="ml-3 text-sm font-medium"> {opt.displayName} </span>
    </Link>
  );

  return (
    <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1 h-full">
      {[
        {
          displayName: "Admin",
          icon: faUserNinja,
          link: "/admin",
        },
        {
          displayName: "Front Desk",
          icon: faDesktopAlt,
          link: "/frontdesk",
        },
        {
          displayName: "Accounts",
          icon: faDesktopAlt,
          link: "/frontdesk",
        },
        {
          displayName: "Profile",
          icon: faUserEdit,
          link: "/frontdesk",
          children: [
            {
              displayName: "Settings",
              icon: faGear,
              link: "/frontdesk",
            },
            {
              displayName: "Logout",
              icon: faArrowRightFromBracket,
              link: "/",
            },
          ],
        },
      ].map((opt, index) => {
        if (opt.children) {
          return (
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center px-4 py-2 cursor-pointer rounded-lg text-white hover:text-rose-50 hover:bg-info">
                <FontAwesomeIcon
                  icon={opt.icon}
                  className="w-5 h-5 opacity-75"
                />

                <span className="ml-3 text-sm font-medium">
                  {opt.displayName}
                </span>

                <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
                  <FontAwesomeIcon icon={faCaretUp} className="w-5 h-5" />
                </span>
              </summary>

              <nav aria-label="Teams Nav" className="mt-1.5 ml-8 flex flex-col">
                {opt.children.map((chd) => getNavLink(chd))}
              </nav>
            </details>
          );
        }

        return <>{getNavLink(opt)}</>;
      })}
    </nav>
  );
};

export default MenuOptions;
