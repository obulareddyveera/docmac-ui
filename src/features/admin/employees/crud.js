import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  EMPLOYEE_SLICE_STATE,
  postEmployeeAsync,
  putEmployeeAsync,
  resetItem,
} from "./slice";
import { fetchPersonByIdAsync } from "./slice";
import EmployeeGeneralForm from "./form.general";
import EmployeePayrollForm from "./form.payroll";
import EmployeeQulificationForm from "./form.qualification";
import { qualificationPrivileges, qualificationRoles } from "./meta";
import formSchema from "./form.schema";
import { notify } from "../../../services/service.slice";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const EmployeesCrud = () => {
  const { errorslice, status, item } = useSelector((state) => state.employee);
  const [state, setState] = useState({
    initialValues: {
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
      addNewAccount: {
        bankName: "Kotak Bank",
        accountNo: "6876817482424",
        ifscCode: "IFUR87914",
      },
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { from, personId } = location.state || {};
  const employeeEntity = useSelector((state) => state.employee);
  console.log("---==> employeeEntity ", employeeEntity);
  useEffect(() => {
    if (
      employeeEntity &&
      [
        EMPLOYEE_SLICE_STATE.POST_API_EMPLOYEE_FULLFILLED,
        EMPLOYEE_SLICE_STATE.PUT_API_EMPLOYEE_FULLFILLED,
      ].includes(employeeEntity.status)
    ) {
      dispatch(
        notify({
          status: "show",
          message: `Employee created successfully`,
          kickStartTime: 5000,
          className: "alert-warning",
          icon: faWarning,
        })
      );
      navigate("/board/admin/employees");
    }
  }, [employeeEntity]);
  useEffect(() => {
    if (personId) {
      dispatch(fetchPersonByIdAsync(personId));
    } else {
      dispatch(resetItem());
    }
  }, [personId]);

  useEffect(() => {
    if (item) {
      const selectedPrivsName =
        item.Privs && item.Privs.length > 0
          ? item.Privs.map((entity) => entity.name)
          : [];
      const selectedProfileSnapTitles =
        item.ProfileSnap && item.ProfileSnap.length > 0
          ? item.ProfileSnap.map((entity) => entity.title)
          : [];

      setState((prevState) => {
        return {
          ...prevState,
          initialValues: {
            ...prevState.initialValues,
            type: item.type || "default",
            PaymentDetails:
              item && item.PaymentDetails ? [...item.PaymentDetails] : [],
            showAddNewAccount: false,
            ProfileSnap: item && item.ProfileSnap ? [...item.ProfileSnap] : [],
            selectedProfileSnapTitles,
            Privs: item && item.Privs ? [...item.Privs] : [],
            privileges: qualificationPrivileges.map((entity) => {
              return {
                ...entity,
                isActive: selectedPrivsName.indexOf(entity.name) > -1,
              };
            }),
            roles: qualificationRoles.map((entity) => {
              return {
                ...entity,
                isActive: selectedPrivsName.indexOf(entity.name) > -1,
              };
            }),
            title: "",
            activeStepIndex: 0,
            salary: "",
            referal: "",
            ...item,
          },
        };
      });
    }
  }, [item]);

  return (
    <>
      <div className="grig grid-rows-2 gap-2 md:m-4 md:p-4">
        <Link to={from?.pathname} className="btn btn-sm m-4">
          Back
        </Link>
        <div className="flex flex-col w-full p-4">
          <Formik
            initialValues={state.initialValues}
            validationSchema={formSchema}
            onSubmit={(values) => {
              if (values.id) {
                dispatch(putEmployeeAsync(values));
              } else {
                dispatch(postEmployeeAsync(values));
              }
            }}
            enableReinitialize
          >
            {({
              isValid,
              setFieldValue,
              values,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <select
                    id="type"
                    name="type"
                    className="w-full select select-md"
                    onChange={handleChange}
                    disabled={personId && item && item.type}
                  >
                    <option
                      value={"default"}
                      disabled
                      selected={values.type === "default"}
                    >
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
                        <option
                          key={rec.val}
                          value={rec.val}
                          selected={rec.val === values.type}
                        >
                          {rec.displayName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {values.type && values.type !== "default" ? (
                  <>
                    <ul className="steps mt-4 mb-4 w-full">
                      {["General", "Qualification", "Payroll"].map(
                        (rec, index) => {
                          return (
                            <li
                              className={`step ${
                                values.activeStepIndex === index
                                  ? "step-neutral"
                                  : ""
                              }`}
                              key={`wizardEntity_${index}`}
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
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EmployeesCrud;
