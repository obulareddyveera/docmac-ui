import LayoutTemplate from "../components/utils/layout";
import ProtectedRoute from "../components/utils/protectedRoute";

const FrontDeskPatient = () => {
  return (
    <>
      <LayoutTemplate>
        <ProtectedRoute />
      </LayoutTemplate>
    </>
  );
};

export default FrontDeskPatient;
