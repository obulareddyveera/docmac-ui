import { useFormikContext } from "formik";
import React from "react";

const TextareaField = ({ id, label, hideLabel, ...props }) => {
  const { errors, touched, handleChange, handleBlur, values } =
    useFormikContext();
  return (
    <>
      <div className="form-control w-full">
        {!hideLabel && (
          <label className="label">
            <span
              className={`label-text ${
                errors && errors[id] && touched[id] && "text-red-600"
              }`}
            >
              {label}
            </span>
            <span
              className={`label-text-alt ${
                errors && errors[id] && "text-red-600"
              }`}
            >
              *
            </span>
          </label>
        )}
        <textarea
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {errors && errors[id] && touched[id] && (
          <label className="label">
            <span className="label-text-alt text-red-600">{errors[id]}</span>
          </label>
        )}
      </div>
    </>
  );
};

export default TextareaField;
