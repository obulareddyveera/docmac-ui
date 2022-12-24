import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EMPLOYEE_SLICE_STATE, resetItem } from "../slice";
import { generateKeyEntity } from "../../services/utils";
import { fetchPersonByIdAsync } from "../slice";
import EmployeeGeneralForm from "./form.general";
import EmployeePayrollForm from "./form.payroll";
import EmployeeQulificationForm from "./form.qualification";
import { qualificationPrivileges, qualificationRoles } from "./meta";
import formSchema from "./form.schema";

const EmployeeCrud = () => {
  const { errorslice, status, item } = useSelector((state) => state.employee);
  const [state, setState] = useState();

  const location = useLocation();
  const dispatch = useDispatch();
  const {
    state: { from, personId },
  } = location;
  useEffect(() => {
    if (personId) {
      dispatch(fetchPersonByIdAsync(personId));
    } else {
      dispatch(resetItem());
    }
  }, [personId]);

  return (
    <>
      <div className="grig grid-rows-2 gap-2 md:m-4 md:p-4">
        <Link to={from?.pathname} className="btn btn-sm m-4">
          Back
        </Link>
        <div className="flex flex-col w-full p-4">
          <Formik
            initialValues={{
              employeeType: item.type || "default",
              supportedBanks: [
                { bankName: "Andhra Bank" },
                { bankName: "Axis Bank" },
                { bankName: "HDFC Bank" },
                { bankName: "ICICI Bank" },
                { bankName: "IDFC Bank" },
                { bankName: "Kotak Bank" },
                { bankName: "SBI Bank" },
                { bankName: "Union Bank" },
                { bankName: "Other" },
              ],
              PaymentDetails:
                item && item.PaymentDetails ? [...item.PaymentDetails] : [],
              addNewAccount: {
                bankName: "Kotak Bank",
                accountNo: "6876817482424",
                ifscCode: "IFUR87914",
              },
              showAddNewAccount: true,
              ProfileSnap:
                item && item.ProfileSnap ? [...item.ProfileSnap] : [],
              selectedProfileSnapTitles:
                state && state.selectedProfileSnapTitles
                  ? state.selectedProfileSnapTitles
                  : [],
              Privs: item && item.Privs ? [...item.Privs] : [],
              selectedPrivsName:
                state && state.selectedPrivsName ? state.selectedPrivsName : [],
              privileges: [...qualificationPrivileges],
              roles: [...qualificationRoles],
              title: "",
              activeStepIndex: 0,
              salary: "",
              referal: "",
              ...item,
            }}
            validationSchema={formSchema}
            handleSubmit={(vals) => {
              console.log("--== create employee ", vals);
            }}
            enableReinitialize
          >
            {({ isValid, setFieldValue, values, handleChange, handleBlur }) => (
              <>
                <select
                  id="employeeType"
                  name="employeeType"
                  className="select select-md"
                  onChange={handleChange}
                  defaultValue={values.employeeType}
                  disabled={personId && item && item.type}
                >
                  <option value={"default"} disabled>
                    {personId && item && item.type
                      ? item.type
                      : "Pick Employee Type"}
                  </option>
                  {[
                    { displayName: "Doctor", val: "doctor" },
                    { displayName: "Nurse", val: "nurse" },
                    { displayName: "Helper", val: "helper" },
                  ].map((rec) => {
                    return (
                      <option key={rec.val} value={rec.val}>
                        {rec.displayName}
                      </option>
                    );
                  })}
                </select>

                {values.employeeType && values.employeeType !== "default" ? (
                  <>
                    <ul className="steps mt-4 mb-4">
                      {["General", "Qualification", "Payroll"].map(
                        (rec, index) => {
                          return (
                            <li
                              className={`step ${
                                values.activeStepIndex === index
                                  ? "step-neutral"
                                  : ""
                              }`}
                              key={generateKeyEntity("steps", index)}
                            >
                              <button
                                className={`btn btn-sm btn-ghost ${
                                  values.activeStepIndex === index
                                    ? "btn-active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("activeStepIndex", index)
                                }
                              >
                                {rec}
                              </button>
                            </li>
                          );
                        }
                      )}
                    </ul>
                    <div className="flex flex-col w-full border-opacity-50">
                      {values.activeStepIndex === 0 && <EmployeeGeneralForm />}
                      {values.activeStepIndex === 1 && (
                        <EmployeeQulificationForm />
                      )}
                      {values.activeStepIndex === 2 && <EmployeePayrollForm />}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[100vh]">
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 text-portalBg animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div className="text-md text-portalBg font-handwriting-caveat">
                      Pick Employee Type
                    </div>
                  </div>
                )}
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EmployeeCrud;
