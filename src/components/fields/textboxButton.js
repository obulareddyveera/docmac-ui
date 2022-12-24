import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormikContext } from "formik";
import React, { useState } from "react";

const TextboxButton = ({
  id,
  label,
  handleBtnClick,
  placeholder,
  ...props
}) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const { errors, setFieldValue, handleChange, handleBlur, values } =
    useFormikContext();

  const handleOnClick = (e) => {
    handleBtnClick(textFieldValue);
    setTextFieldValue("");
  };
  return (
    <>
      <div className="form-control w-full">
        <div className="input-group w-full">
          <input
            type="text"
            placeholder={placeholder}
            className="input input-bordered w-full"
            onChange={(e) => setTextFieldValue(e.target.value)}
            value={textFieldValue}
          />
          <button className="btn btn-square" onClick={handleOnClick}>
            <FontAwesomeIcon className="h-6 w-6" icon={faAdd} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TextboxButton;
