import React from "react";
import {
  faPersonDigging,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";

import Earnings from "../../../components/stat/earnings";
import Attendence from "../../../components/stat/attendence";
import SchedulesMaintain from "../../../components/stat/schedulesMaintain";

const AdminDashboard = () => {
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
    </>
  );
};

export default AdminDashboard;
