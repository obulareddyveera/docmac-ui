import { useFormikContext } from "formik";
import InputMask from "react-input-mask";
import React, { useEffect } from "react";

const PanNumberField = ({ state = {}, id, label, ...props }) => {
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
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={10}
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

export default PanNumberField;
