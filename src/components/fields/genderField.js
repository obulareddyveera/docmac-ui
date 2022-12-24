import { useFormikContext } from "formik";
import React from "react";
import { generateKeyEntity } from "../../services/utils";

const GenderInputField = ({ state = {}, id, label, ...props }) => {
  const { touched, setFieldValue, values, ...formik } = useFormikContext();
  const errors = { ...formik.errors, ...state?.errors };

  const handleGenderSelect = (rec) => {
    setFieldValue(id, rec.value);
  };
  return (
    <>
      <div className="form-control w-full">
        <label className="label">
          <span className={`label-text`}>{label}</span>
          <span
            className={`label-text-alt ${
              errors && errors[id] && "text-red-600"
            }`}
          >
            *
          </span>
        </label>
        <fieldset className="grid grid-cols-3 gap-1 m-2">
          {[
            { displayName: "Male", name: id, value: "male" },
            { displayName: "Female", name: id, value: "female" },
            { displayName: "Others", name: id, value: "others" },
          ].map((rec, index) => {
            return (
              <div key={generateKeyEntity("genderField", index)}>
                <input
                  type="radio"
                  name={rec.name}
                  value={rec.value}
                  id={rec.value}
                  className="peer hidden"
                  onChange={() => {}}
                  checked={rec.value === values[id]}
                />

                <button
                  htmlFor={rec.value}
                  className="w-full flex bg-white cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                  onClick={() => handleGenderSelect(rec)}
                >
                  <p className="text-sm font-medium">{rec.displayName}</p>
                </button>
              </div>
            );
          })}
        </fieldset>

        {errors && errors[id] && (
          <label className="label">
            <span className="label-text-alt text-red-600">{errors[id]}</span>
          </label>
        )}
      </div>
    </>
  );
};

export default GenderInputField;
