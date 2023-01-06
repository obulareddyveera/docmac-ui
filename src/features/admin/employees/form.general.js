import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import { generalFields } from "./meta";

const EmployeeGeneralForm = () => {
  const { touched, isValid, values, setFieldValue } = useFormikContext();
  return (
    <>
      {generalFields?.map((rec, index) => {
        const attrs = {
          type: rec.type,
          label: rec.label,
          placeholder: rec.label,
          id: rec.id,
          name: rec.id,
          value: values[rec.id],
        };
        return (
          <React.Fragment key={index}>
            <rec.component {...attrs} />
          </React.Fragment>
        );
      })}
      <div className="form-control mt-4 border-t-2 border-white p-1">
        <div className="flex justify-end">
          <button
            className="btn btn-sm btn-success"
            onClick={() => setFieldValue("activeStepIndex", values.activeStepIndex + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeGeneralForm;
