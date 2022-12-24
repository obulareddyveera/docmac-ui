import { useFormikContext } from "formik";
import React from "react";

const LabelField = ({ id, label, ...props }) => {
  const { errors, handleChange, handleBlur, values } = useFormikContext();
  return (
    <>
      <div>
        <label>{label} :</label>
      </div>
    </>
  );
};

export default LabelField;
