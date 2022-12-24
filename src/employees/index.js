import LayoutTemplate from "../components/utils/layout";
import ProtectedRoute from "../components/utils/protectedRoute";

const DocMacEmployees = () => {
  return (
    <>
      <LayoutTemplate>
        <ProtectedRoute />
      </LayoutTemplate>
    </>
  );
};

export default DocMacEmployees;
