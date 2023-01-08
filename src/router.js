import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import SpinnerComponent from "./components/utils/spinner";
import LoginFeature from "./features/auth/login";
import RegisterAuthFeature from "./features/auth/register";
import PortalModule from "./features/portal";
import FrontDeskFeature from "./features/front-desk";

import "./index.css";
import FrontDeskPatient from "./patients";
import FrontDeskPatientDml from "./patients/view/dm";
import AdminDesk from "./features/admin";
import ActiveTabView from "./features/front-desk/desk/active.tab.view";
import CheckedInTabView from "./features/front-desk/desk/checkedin.tab.view";
import PostponedTabView from "./features/front-desk/desk/postponed.tab.view";
import DocMacBoard from "./features/board";
import AdminDashboard from "./features/admin/dashboard";
import EmployeesDesk from "./features/admin/employees";
import EmployeesBoard from "./features/admin/employees/board";
import EmployeesCrud from "./features/admin/employees/crud";
import ExternalLinkFeature from "./features/auth/externalLink";
import WebWhatsapp from "./features/web-whatsapp";

export default () => {
  return (
    <>
      <React.StrictMode>
        <SpinnerComponent />
        <BrowserRouter>
          <Routes>
            <Route index element={<PortalModule />} />
            <Route path="login" element={<LoginFeature />} />
            <Route path="register" element={<RegisterAuthFeature />} />
            <Route path=":mobileNumber" element={<ExternalLinkFeature />} />
            <Route path="board" element={<DocMacBoard />}>
              <Route path="admin" element={<AdminDesk />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<EmployeesDesk />}>
                  <Route index element={<EmployeesBoard />} />
                  <Route path=":personId" element={<EmployeesCrud />} />
                </Route>
              </Route>
              <Route path="webWhatsapp" element={<WebWhatsapp />} />
            </Route>
            <Route path="frontdesk" element={<FrontDeskFeature />}>
              <Route index element={<ActiveTabView />} />
              <Route path="postponed" element={<PostponedTabView />} />
              <Route path="checkedIn" element={<CheckedInTabView />} />
            </Route>
            <Route path="patients" element={<FrontDeskPatient />}>
              <Route path=":customerId" element={<FrontDeskPatientDml />} />
            </Route>
            <Route path="*" element={<PortalModule />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
};
