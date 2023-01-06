import React, { useEffect } from "react";
import {
  faPersonDigging,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";

import { generateKeyEntity } from "../../services/utils";

const AdminDesk = () => {
  const location = useLocation();
  const tabOptions = [
    {
      displayName: "Dashboard",
      icon: faPersonDigging,
      id: "dashboardTab",
      link: "dashboard",
      isActive: location.pathname.indexOf("dashboard") > -1,
    },
    {
      displayName: "Employees",
      icon: faPersonDigging,
      id: "employeesTab",
      link: "employees",
      isActive: location.pathname.indexOf("employees") > -1,
    },
    {
      displayName: "Accounts",
      icon: faPiggyBank,
      id: "accountsTab",
      link: "accounts",
      disabled: true,
      isActive: location.pathname.indexOf("accounts") > -1,
    },
    {
      displayName: "Marketing",
      icon: faPiggyBank,
      id: "marketingTab",
      link: "marketing",
      disabled: true,
      isActive: location.pathname.indexOf("marketing") > -1,
    },
  ];
  return (
    <>
      
      <div className="flex flex-col items-center justify-center mt-1 pt-3 border-b-3 border-white w-full">
        <div className="tabs">
          {tabOptions.map((rec, idx) => {
            return (
              <React.Fragment key={generateKeyEntity("adminTabs", idx)}>
                <Link
                  to={rec.link}
                  className={`tab tab-bordered text-gray-900 ${
                    rec.isActive ? "border-portalBg" : ""
                  }`}
                >
                  {rec.displayName}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminDesk;
