import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import SpinnerComponent from "./components/utils/spinner";
import LoginFeature from "./features/auth/login";
import RegisterAuthFeature from "./features/auth/register";
import PortalModule from "./features/portal";
import FrontDeskFeature from "./features/front-desk";
import DocMacAdmin from "./features/admin";

import "./index.css";
import FrontDeskPatient from "./patients";
import FrontDeskPatientDml from "./patients/view/dm";
import AdminDesk from "./features/admin/desk";
import EmployeesDesk from "./employees/desk";
import ActiveTabView from "./features/front-desk/desk/active.tab.view";
import CheckedInTabView from "./features/front-desk/desk/checkedin.tab.view";
import PostponedTabView from "./features/front-desk/desk/postponed.tab.view";
import EmployeeCrud from "./employees/desk/crud";
import DocMacEmployees from "./employees";

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
            <Route path="frontdesk" element={<FrontDeskFeature />}>
              <Route index element={<ActiveTabView />} />
              <Route path="postponed" element={<PostponedTabView />} />
              <Route path="checkedIn" element={<CheckedInTabView />} />
            </Route>
            <Route path="admin" element={<DocMacAdmin />}>
              <Route element={<AdminDesk />}>
                <Route index element={<EmployeesDesk />} />
              </Route>
            </Route>
            <Route path="employee" element={<DocMacEmployees />}>
              <Route path=":personId" element={<EmployeeCrud />} />
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
