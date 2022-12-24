import LayoutTemplate from "../../components/utils/layout";
import ProtectedRoute from "../../components/utils/protectedRoute";

const DocMacAdmin = () => {
  return (
    <>
      <LayoutTemplate>
        <ProtectedRoute />
      </LayoutTemplate>
    </>
  );
};

export default DocMacAdmin;
