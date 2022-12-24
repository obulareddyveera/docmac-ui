import { faUserDoctor, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const Earnings = () => {
  return (
    <>
      <article className="flex bg-white transition hover:shadow-xl">
        <div className="flex flex-1 flex-col justify-between">
          <div className="stats shadow rounded-none">
            <div className="stat bg-[#6DD47E]">
              <div className="stat-title">Doctors</div>
              <div className="flex">
                <FontAwesomeIcon className="w-3 h-3" icon={faUserDoctor} />
                <div className="stat-value">4</div>
              </div>
              <div className="stat-desc">↗︎ out of 6</div>
            </div>
            <div className="stat bg-[#FFD55A]">
              <div className="stat-title">Nurses</div>
              <div className="flex">
                <FontAwesomeIcon className="w-3 h-3" icon={faUserNurse} />
                <div className="stat-value">7</div>
              </div>
              <div className="stat-desc">↗︎ out of 7</div>
            </div>
          </div>

          <div className="flex">
            <div className=" w-full block bg-[#05386B] px-5 py-3 text-center text-xs font-bold uppercase text-white transition">
              <span className="text-gray-200  text-xl">Earnings</span>
              <span className="text-md">
                {" "}
                @ {moment(new Date()).format("dddd")},{" "}
              </span>
              {` ${moment(new Date()).format("DD/MM/YYYY")}`}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Earnings;
