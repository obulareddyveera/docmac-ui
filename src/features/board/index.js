import React from 'react'
import LayoutTemplate from "../../components/utils/layout";
import ProtectedRoute from "../../components/utils/protectedRoute";

const DocMacBoard = () => {
  return (
    <>
      <React.StrictMode>
        <LayoutTemplate>
          <ProtectedRoute />
        </LayoutTemplate>
      </React.StrictMode>
    </>
  );
};

export default DocMacBoard;
