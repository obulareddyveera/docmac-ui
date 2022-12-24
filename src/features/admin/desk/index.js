import React from "react";
import {
  faPersonDigging,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";

import { generateKeyEntity } from "../../../services/utils";
import Earnings from "../../../components/stat/earnings";
import Attendence from "../../../components/stat/attendence";
import SchedulesMaintain from "../../../components/stat/schedulesMaintain";
import ProtectedRoute from "../../../components/utils/protectedRoute";
import { Link } from "react-router-dom";

const AdminDesk = () => {
  const tabOptions = [
    {
      displayName: "Employees",
      icon: faPersonDigging,
      id: "employeesTab",
      link: "/admin/",
      isActive: true,
    },
    {
      displayName: "Accounts",
      icon: faPiggyBank,
      id: "accountsTab",
      link: "/admin/accounts",
      disabled: true,
    },
    {
      displayName: "Marketing",
      icon: faPiggyBank,
      id: "marketingTab",
      link: "/admin/marketing",
      disabled: true,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 w-full p-3">
        <Earnings />
        <SchedulesMaintain />
        <Attendence />
      </div>
      <div className="flex flex-col items-center justify-center mt-1 pt-3 border-b-3 border-white w-full">
        <div className="tabs">
          {tabOptions.map((rec, idx) => {
            return (
              <React.Fragment key={generateKeyEntity("adminTabs", idx)}>
                <Link
                  to={rec.link}
                  className={`tab tab-bordered ${
                    rec.isActive ? "tab-active" : ""
                  }`}
                >
                  {rec.displayName}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
        <ProtectedRoute />
      </div>
    </>
  );
};

export default AdminDesk;
