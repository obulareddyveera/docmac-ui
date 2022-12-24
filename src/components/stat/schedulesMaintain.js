import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SchedulesMaintain = () => {
  return (
    <>
      <div className="stat bg-[#F93800] text-[#283350]">
        <div className="flex justify-between">
          <div className=" flex flex-col justify-center items-center">
            <div className="font-handwriting-pacifico text-white text-xl">
              Schedules
            </div>
            <div className="stat-figure text-white">
              <FontAwesomeIcon className="w-6 h-6" icon={faClipboardList} />
            </div>
            <div className="stat-actions">
              <button className="btn btn-sm bg-[#FFB500] border-0">
                <span>Add New</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center align-center">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-md">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-specimen-oswald-wght-300 text-white">
                      Tasks
                    </th>
                    <td className="whitespace-nowrap px-4 py-2 text-white">
                      <span>2</span>
                      <span className="stat-desc">↗︎ out of 3</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-specimen-oswald-wght-300 text-white">
                      Accepted Leaves
                    </th>
                    <td className="whitespace-nowrap px-4 py-2 text-white">
                      <span>5</span>
                      <span className="stat-desc">↗︎ out of 18</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchedulesMaintain;
