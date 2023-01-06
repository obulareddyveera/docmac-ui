import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import EmployeeTable from "../../../components/emp-table";
import { fetchAsync } from "./slice";

const EmployeesBoard = () => {
  const { data } = useSelector((state) => state.employee);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("--== EmployeesBoard :::: NativeField ==--");
    dispatch(fetchAsync());
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-3 flex justify-end w-full">
          <Link
            to="add"
            state={{ from: location }}
            className="btn btn-info btn-sm text-info-content"
          >
            Add New Employee
          </Link>
        </div>
        <EmployeeTable rows={data.rows} count={data.count} />
      </div>
    </>
  );
};

export default EmployeesBoard;
