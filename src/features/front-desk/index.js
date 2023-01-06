import { useLocation } from "react-router";
import { generateKeyEntity } from "../../services/utils";
import ProtectedRoute from "../../components/utils/protectedRoute";
import { Link } from "react-router-dom";
import LayoutTemplate from "../../components/utils/layout";

const FrontDeskFeature = () => {
  const location = useLocation();
  const tabOptions = [
    {
      displayName: "Active",
      link: "/frontdesk",
      pathname: "/frontdesk",
    },
    {
      displayName: "Postponed",
      link: "postponed",
      pathname: "/frontdesk/postponed",
    },
    {
      displayName: "Checked In",
      link: "checkedIn",
      pathname: "/frontdesk/checkedIn",
    },
  ];
  return (
    <>
      <LayoutTemplate>
        <div className="flex flex-col items-center justify-center">
          <div className="container">
            <div className="m-2 grid grid-rows-1 gap-1 align-center justify-end">
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn m-1 btn-sm">
                  Select Doctor
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu p-2 shadow rounded-box w-52"
                >
                  <li>
                    <Link>Item 1</Link>
                  </li>
                  <li>
                    <Link>Item 2</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="m-2 flex flex-col align-center justify-center">
              <div className="flex align-center justify-center">
                <div className="tabs">
                  {tabOptions.map((tab, idx) => {
                    return (
                      <Link
                        to={tab.link}
                        key={generateKeyEntity("tabs", idx)}
                        className={`tab tab-bordered ${
                          location.pathname === tab.pathname ? "tab-active" : ""
                        }`}
                      >
                        {tab.displayName}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div>
                <ProtectedRoute />
              </div>
            </div>
          </div>
        </div>
      </LayoutTemplate>
    </>
  );
};

export default FrontDeskFeature;
