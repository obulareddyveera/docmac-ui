import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmployeeRecord = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-1 border-b-2  border-t-2 border-white p-3 font-noto-serif-np-hmong">
        <div className="md:col-start-1 md:col-end-10">
          <div className="grid grid-cols-1 md:grid-cols-10">
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <button className="btn btn-circle btn-outline">
                <FontAwesomeIcon icon={faUserDoctor} className="w-6 h-6" />
              </button>
              <div className="text-lg">Dr Haseena Shaikh</div>
            </div>
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center">
              MBBS, MD - Obstetrics & Gynaecology Gynecologist
            </div>
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center">
              +91-8929182898, 8878789221, 8989399400
            </div>
            <div className="md:col-span-2">
              <div>Mon - Sat: 10:00 AM - 06:00 PM</div>
              <div>Sun: 10:00 AM - 01:00 PM</div>
            </div>
          </div>
        </div>
        <div className="md:col-start-11 md:col-end-12 flex flex-row items-end justify-end">
          <div className="btn-group">
            <button className="btn btn-sm btn-primary text-primary-content">
              Edit
            </button>
            <button className="btn btn-sm btn-warning text-warning-content">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeRecord;
