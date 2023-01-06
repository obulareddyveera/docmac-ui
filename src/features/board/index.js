import LayoutTemplate from "../../components/utils/layout";
import ProtectedRoute from "../../components/utils/protectedRoute";

const DocMacBoard = () => {
  return (
    <>
      <LayoutTemplate>
        <ProtectedRoute />
      </LayoutTemplate>
    </>
  );
};

export default DocMacBoard;
