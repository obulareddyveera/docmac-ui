import * as React from "react";
import { useFormikContext } from "formik";
import moment from "moment";

const DatepickerWebField = ({ state = {}, id, label, ...props }) => {
  const { touched, handleChange, handleBlur, values, ...formik } =
    useFormikContext();
  const errors = { ...formik.errors, ...state?.errors };
  return (
    <>
      <div className="form-control w-full">
        <label className="label">
          <span
            className={`label-text ${
              errors &&
              errors[id] &&
              (touched[id] || values[id]) &&
              "text-red-600"
            }`}
          >
            {label}
          </span>
          {touched[id] && (
            <span
              className={`label-text-alt ${
                errors && errors[id] && "text-red-600"
              }`}
            >
              *
            </span>
          )}
        </label>
        <label className="input-group">
          <input
            className="input input-bordered w-full"
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
            id={id}
            type="date"
            value={values[id]}
            inputlabelprops={{
              shrink: true,
            }}
          />
          <span>{values[id] && values[id] !== "" ? `${moment().diff(values[id], "years")}` : "-"}</span>
        </label>
        {errors && errors[id] && (touched[id] || values[id]) && (
          <label className="label">
            <span className="label-text-alt text-red-600">{errors[id]}</span>
          </label>
        )}
      </div>
    </>
  );
};

export default DatepickerWebField;
