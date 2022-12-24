import { faUserDoctor, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const Attendence = () => {
  const todaysDate = new Date();
  return (
    <>
      <article className="flex bg-white transition hover:shadow-xl">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr] bg-[#05386B] border-l-2  border-white">
          <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-white">
            <span>{moment(todaysDate).format("YYYY")}</span>
            <span className="w-px flex-1 bg-white"></span>
            <span>{moment(todaysDate).format("MMM-DD")}</span>
          </time>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-row h-full">
            <div className="flex flex-col flex-1 bg-[#14A76C] justify-center items-center">
              <div className="stat-title">Doctors</div>
              <div className="flex">
                <FontAwesomeIcon className="w-3 h-3" icon={faUserDoctor} />
                <div className="stat-value">4</div>
              </div>
              <div className="stat-desc">out of 6</div>
            </div>
            <div className="flex flex-col flex-1 bg-[#FF652F] justify-center items-center">
              <div className="stat-title">Nurses</div>
              <div className="flex">
                <FontAwesomeIcon className="w-3 h-3" icon={faUserNurse} />
                <div className="stat-value">7</div>
              </div>
              <div className="stat-desc">out of 7</div>
            </div>
            <div className="flex flex-col flex-1 bg-[#FFE400] justify-center items-center">
              <div className="stat-title">Helpers</div>
              <div className="flex">
                <FontAwesomeIcon className="w-3 h-3" icon={faUserNurse} />
                <div className="stat-value">2</div>
              </div>
              <div className="stat-desc">out of 3</div>
            </div>
          </div>

          <div className="flex">
            <button className=" w-full block bg-[#05386B] px-5 py-3 text-center text-xs font-bold uppercase text-white transition">
              Attendence Details
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default Attendence;
