import React, { useEffect, useState } from "react";
import { FieldArray, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import TextboxField from "../../components/fields/textboxField";
import { generateKeyEntity } from "../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { isValidDataEntity } from "./meta";

const EmployeePayrollForm = () => {
  const {
    touched,
    isValid,
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit
  } = useFormikContext();

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-4 p-4">
        <div>
          <div className="divider">Bank Details</div>
          <FieldArray
            name="PaymentDetails"
            render={(arrayHelpers) => (
              <>
                <button
                  className="btn btn-sm btn-success text-white"
                  onClick={() => setFieldValue("showAddNewAccount", true)}
                >
                  Add Bank Account
                </button>
                {values.showAddNewAccount && (
                  <div className="py-2">
                    <select
                      id={`addNewAccount.bankName`}
                      name={`addNewAccount.bankName`}
                      className="select select-md select-bordered w-full"
                      onChange={handleChange}
                      value={values.addNewAccount.bankName}
                      onBlur={handleBlur}
                    >
                      <option value={""} disabled>
                        Select Bank
                      </option>
                      {values.supportedBanks.map((rec, index) => {
                        return (
                          <React.Fragment
                            key={generateKeyEntity("bankName", index)}
                          >
                            <option value={rec.bankName}>{rec.bankName}</option>
                          </React.Fragment>
                        );
                      })}
                    </select>
                    <TextboxField
                      type="text"
                      label="Account Number"
                      placeholder="Account Number"
                      id={`addNewAccount.accountNo`}
                      name={`addNewAccount.accountNo`}
                      value={values.addNewAccount.accountNo}
                    />
                    <TextboxField
                      type="text"
                      label="IFSC Code"
                      placeholder="IFSC Code"
                      id={`addNewAccount.ifscCode`}
                      name={`addNewAccount.ifscCode`}
                      value={values.addNewAccount.ifscCode}
                    />
                    <div className="py-3 flex items-end justify-between">
                      <button
                        className="btn btn-sm text-white"
                        onClick={() => {
                          setFieldValue("addNewAccount", {
                            bankName: "",
                            accountNo: "",
                            ifscCode: "",
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-sm btn-info text-white"
                        onClick={() => {
                          setFieldValue("showAddNewAccount", false);
                          arrayHelpers.push({
                            ...values.addNewAccount,
                            isActive: false,
                          });
                        }}
                        disabled={
                          errors.addNewAccount || !touched.addNewAccount
                        }
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                <div className="py-2">
                  <FieldArray
                    name="PaymentDetails"
                    render={(arrayHelpers) => (
                      <>
                        {values.PaymentDetails.map((rec, index) => {
                          return (
                            <>
                              <div className="py-2">
                                <div className="flex justify-between w-full bg-gray-700 py-1 px-1 text-white text-center">
                                  <label className="cursor-pointer label justify-between md:justify-start">
                                    <input
                                      type="checkbox"
                                      checked={
                                        values.PaymentDetails[index].isActive
                                      }
                                      id={`PaymentDetails[${index}].isActive`}
                                      name={`PaymentDetails[${index}].isActive`}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      className={`checkbox checkbox-accent`}
                                    />
                                    <span className="label-text pl-2 text-white">
                                      active
                                    </span>
                                  </label>
                                  <button
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn btn-circle btn-sm"
                                  >
                                    <FontAwesomeIcon
                                      icon={faTimes}
                                      className="w-4 h-4"
                                    />
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 border-b-2 border-white">
                                  <div className="bg-gray-600 py-2 px-1 text-white text-lg">
                                    Bank Name
                                  </div>
                                  <div className="bg-gray-500 py-2 px-1 text-white text-center">
                                    {rec.bankName}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b-2 border-white">
                                  <div className="bg-gray-600 py-2 px-1 text-white text-lg">
                                    Account Number
                                  </div>
                                  <div className="bg-gray-500 py-2 px-1 text-white text-center">
                                    {rec.accountNo}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b-2 border-white">
                                  <div className="bg-gray-600 py-2 px-1 text-white text-lg">
                                    IFSC Code
                                  </div>
                                  <div className="bg-gray-500 py-2 px-1 text-white text-center">
                                    {rec.ifscCode}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  />
                </div>
              </>
            )}
          />
        </div>
        <div>
          <div className="divider">Benfits</div>
          <div className="grid grid-cols-1">
            <div className="p-2 grid grid-cols-2 gap-2">
              <div>Salary</div>
              <div>
                <TextboxField
                  id="salary"
                  placeholder={"Enter salary"}
                  name="salary"
                  hideLabel={true}
                  value={values.salary}
                />
              </div>
            </div>
            <div className="p-2 grid grid-cols-2 gap-2">
              <div>Referal Amount</div>
              <div>
                <TextboxField
                  id="referal"
                  placeholder={"Enter referal amount"}
                  name="referal"
                  hideLabel={true}
                  value={values.referal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-control mt-4 p-1 border-t-2 border-white">
        <div className="flex justify-between">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setFieldValue("activeStepIndex", values.activeStepIndex - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-success text-white"
            onClick={() => handleSubmit(values)}
            disabled={!isValid}
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
};

const validationSchema = Yup.object().shape({
  addNewAccount: Yup.object().shape({
    bankName: Yup.string().required("Required"),
    accountNo: Yup.string().required("Required"),
    ifscCode: Yup.string().required("Required"),
  }),
  salary: Yup.string().required("Required"),
  referal: Yup.string().required("Required"),
});

export default EmployeePayrollForm;
