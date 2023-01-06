import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { code } = useSelector((state) => {
    return state.service;
  });
  const token = sessionStorage.getItem("docMacTokens");
  if ([401].includes(code)) {
    sessionStorage.removeItem("docMacTokens");
    return <Navigate to="/login" />;
  } else if (token && JSON.parse(token) && JSON.parse(token).accessToken) {
    return (
      <div className="flex flex-col w-full items-center justify-center">
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
  } else {
    sessionStorage.removeItem("docMacTokens");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
