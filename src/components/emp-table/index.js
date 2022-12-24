import React from "react";
import { Link, useLocation } from "react-router-dom";
import { generateKeyEntity } from "../../services/utils";

const EmployeeTable = ({ rows, count }) => {
  const location = useLocation();
  const getAvatarImgByRecord = (rec) => {
    if (rec.type === "doctor") {
      return `/icons/${
        rec.gender === "male" ? "menDoctor.png" : "ladyDoctor.png"
      }`;
    } else if (rec.type === "nurse") {
      return `/icons/${
        rec.gender === "male" ? "nurseGirl.png" : "nurseGirl.png"
      }`;
    } else if (rec.type === "helper") {
      return `/icons/${
        rec.gender === "male" ? "attender.png" : "attender.png"
      }`;
    }
  };
  const getPrivsDisplayValue = (rec) => {
    const privsList = [];
    if (rec.Privs) {
      rec.Privs.forEach((rec) => {
        privsList.push(rec.name);
      });
    }
    return (
      <>
        <span className="text-sm opacity-50">{privsList.join(", ")}</span>
      </>
    );
  };
  const getQualificationDetail = (rec) => {
    const item = rec.ProfileSnap.find(
      (entity) => entity.title === "Qualification"
    );
    return (
      <>
        <span className="text-sm opacity-50">{item.details}</span>
      </>
    );
  };
  return (
    <>
      <div className="hidden md:flex w-full p-4">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Privileges</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!rows ||
                (rows.length === 0 && (
                  <tr>
                    <th colSpan={7}>No Data Found</th>
                  </tr>
                ))}
              {rows &&
                rows.map((rec, index) => {
                  return (
                    <React.Fragment key={generateKeyEntity(rec.mobile, index)}>
                      <tr>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={getAvatarImgByRecord(rec)}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{rec.name}</div>
                              {getQualificationDetail(rec)}
                              <div className="text-sm opacity-50">
                                {rec.aadhar || "-"} | {rec.panNumber || "-"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{rec.email}</td>
                        <td>{rec.mobile}</td>
                        <td>{getPrivsDisplayValue(rec)}</td>
                        <th>
                          <div className="btn-group">
                            <Link
                              to={`/employee/${rec.id}`}
                              state={{ from: location, personId: rec.id }}
                              className="btn btn-primary btn-xs"
                            >
                              Edit
                            </Link>
                            <button className="btn btn-warning btn-xs">
                              Delete
                            </button>
                          </div>
                        </th>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col bg-white w-full items-center justify-center text-center md:hidden">
        {!rows ||
          (rows.length === 0 && (
            <div className="border-b-2 border-gray-200 p-2">
              <div>No Data Found</div>
            </div>
          ))}
        {rows &&
          rows.map((rec, index) => {
            return (
              <div
                className="border-b-2 border-gray-200 p-2"
                key={generateKeyEntity(rec.mobile, index)}
              >
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={getAvatarImgByRecord(rec)}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{rec.name}</div>
                    {getQualificationDetail(rec)}
                    <div className="text-sm opacity-50">
                      {rec.aadhar || "-"} | {rec.panNumber || "-"}
                    </div>
                  </div>
                </div>
                <div>
                  {rec.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {rec.mobile}
                  </span>
                </div>
                <div>{getPrivsDisplayValue(rec)}</div>
                <div>
                  <div className="btn-group">
                    <Link
                      to={`/employee/${rec.id}`}
                      state={{ from: location, personId: rec.id }}
                      className="btn btn-primary btn-xs"
                    >
                      Edit
                    </Link>
                    <button className="btn btn-warning btn-xs">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default EmployeeTable;
