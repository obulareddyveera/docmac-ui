import {
  faAdd,
  faAdjust,
  faAirFreshener,
  faEllipsisH,
  faSearch,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const ActiveTabView = () => {
  const location = useLocation();
  return (
    <>
      <div className="grid grid-cols-1 gap-2 p-2">
        <div className="flex justify-between p-2">
          <div className="badge badge-primary badge-lg">98</div>
          <Link
            to={`/patients/add`}
            state={{ from: location }}
            className="btn btn-secondary btn-sm"
          >
            <FontAwesomeIcon className="h-4 w-4 m-1" icon={faAdd} />
            <span>NEW PATIENT</span>
          </Link>
        </div>
        <div className="input-group p-2">
          <input
            type="text"
            placeholder="Search Patient…"
            className="input input-bordered w-full"
          />
          <button className="btn btn-square btn-success text-white">
            <FontAwesomeIcon className="h-6 w-6" icon={faSearch} />
          </button>
        </div>
        <div className="flex flex-col p-4 border-b-4 border-white text-white bg-info">
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-1 flex flex-col align-center justify-center h-full">
              <div className="p-2 font-handwriting-caveat">#68</div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col">
                <div className="font-extrabold text-lg">Radhika Punugoti</div>
                <div className="flex justify-between text-gray-200 text-md">
                  <div>Female (28)</div>
                  <div>W-65, H-5.7</div>
                </div>
                <div className="text-sm text-gray-200">
                  Queued at 5:30pm. Dec 10 2022
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col align-end justify-center h-full">
              <div className="p-2">
                <button className="btn btn-ghost btn-sm">
                  <FontAwesomeIcon className="w-4 h-4" icon={faEllipsisH} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveTabView;
