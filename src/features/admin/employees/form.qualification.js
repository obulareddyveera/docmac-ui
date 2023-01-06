import React, { useState } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { generateKeyEntity } from "../../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  qualificationOptions,
  getQualificationRecComponent,
  getActiveStatusRecords,
} from "./meta";

const EmployeeQulificationForm = () => {
  const {
    touched,
    setFieldValue,
    values,
    handleBlur,
    handleChange,
    setValues,
    errors,
  } = useFormikContext();
  const [state, setState] = useState();
  const { errorslice, status, item } = useSelector((state) => state.employee);

  const handleAddQualification = () => {
    const selectedRecord = qualificationOptions.find(
      (rec) => rec.id === values.title
    );
    setValues({
      ...values,
      ProfileSnap: [
        ...values.ProfileSnap,
        {
          title: selectedRecord.displayName,
          details: values[selectedRecord.id],
          id: selectedRecord.id,
        },
      ],
      selectedProfileSnapTitles: [
        ...values.selectedProfileSnapTitles,
        selectedRecord.id,
      ],
      title: "",
    });
  };
  const removeQualification = (id, index) => {
    setValues({
      ...values,
      ProfileSnap: values.ProfileSnap.filter((rec) => rec.id !== id),
      selectedProfileSnapTitles: values.selectedProfileSnapTitles.filter(
        (rec) => rec !== id
      ),
      [id]: "",
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-4 p-4">
        <div>
          <div className="divider">Qualifications</div>
          {values.selectedProfileSnapTitles.length !==
            qualificationOptions.length && (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <select
                id="title"
                onChange={handleChange}
                value={values.title}
                name="title"
                className="select select-md select-bordered w-full"
              >
                <option>Pick suitable</option>
                {qualificationOptions.map((rec, index) => {
                  return (
                    <React.Fragment key={generateKeyEntity("title", index)}>
                      {!values.selectedProfileSnapTitles.includes(rec.id) && (
                        <option value={rec.id}>{rec.displayName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <>{getQualificationRecComponent(values.title, values)}</>

              <button
                className="btn btn-md mt-2 md:mt-0 w-full"
                onClick={() => handleAddQualification()}
                disabled={!values[values.title] || values[values.title] === ""}
              >
                Add
              </button>
            </div>
          )}
          <div className="py-2">
            {values &&
              values.ProfileSnap &&
              values.ProfileSnap.map((rec, index) => {
                return (
                  <React.Fragment key={generateKeyEntity("ProfileSnap", index)}>
                    <div
                      className="grid grid-cols-2 border-b-2 border-white"
                      key={generateKeyEntity("profileSnap", index)}
                    >
                      <div className="bg-gray-600 py-2 px-1 text-white text-lg">
                        {rec.title}
                      </div>
                      <div className="bg-gray-500 py-2 px-1">
                        <div className="flex justify-between">
                          <div className="text-white text-center overflow-hidden text-ellipsis px-1">
                            {rec.details}
                          </div>
                          <button
                            onClick={() => removeQualification(rec.id, index)}
                            className="btn btn-circle btn-sm"
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
        <div>
          <div className="divider">Privileges & Roles</div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="form-control md:items-end md:justify-end">
              {values.privileges.map((rules, index) => {
                return (
                  <React.Fragment key={generateKeyEntity("privileges", index)}>
                    <label className="cursor-pointer label justify-between md:justify-start">
                      <span className="label-text pl-2">{rules.name}</span>
                      <input
                        type="checkbox"
                        checked={rules.isActive}
                        id={`privileges[${index}].isActive`}
                        name={`privileges[${index}].isActive`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={`checkbox ml-2 ${rules.colour}`}
                      />
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="form-control md:items-end md:justify-end">
              {values.roles.map((rules, index) => {
                return (
                  <React.Fragment key={generateKeyEntity("roles", index)}>
                    <label className="cursor-pointer label justify-between md:justify-start">
                      <span className="label-text pl-2">{rules.name}</span>
                      <input
                        type="checkbox"
                        checked={rules.isActive}
                        id={`roles[${index}].isActive`}
                        name={`roles[${index}].isActive`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={`checkbox ml-2 ${rules.colour}`}
                      />
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="form-control mt-4 p-1 border-t-2 border-white">
        <div className="flex justify-between">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() =>
              setFieldValue("activeStepIndex", values.activeStepIndex - 1)
            }
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={() =>
              setFieldValue("activeStepIndex", values.activeStepIndex + 1)
            }
            disabled={
              values.selectedProfileSnapTitles.length === 0 ||
              getActiveStatusRecords([...values.roles]).length === 0
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeQulificationForm;
