import { useFormikContext } from "formik";
import InputMask from "react-input-mask";
import React from "react";

const MobileField = ({ errorslice, id, label, ...props }) => {
  const { touched, handleChange, handleBlur, values, ...formik } =
    useFormikContext();
  console.log("--= MobileField errorslice ", errorslice, values[id]);
  const errors = { ...formik.errors, ...errorslice?.messages };
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
        <InputMask
          mask="+\9\1 999 9999 999"
          maskChar=" "
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {errors && errors[id] && (touched[id] || values[id]) && (
          <label className="label">
            <span className="label-text-alt text-red-600">{errors[id]}</span>
          </label>
        )}
      </div>
    </>
  );
};

export default MobileField;
