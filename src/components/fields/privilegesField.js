import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { generateKeyEntity } from "../../services/utils";

const PrivilegesField = ({ id, label, ...props }) => {
  const { touched, handleChange, handleBlur, values } = useFormikContext();
  return (
    <>
      <div className="form-control w-full">
        <div className="divider">{label}</div>
        <FieldArray
          name={id}
          render={(arrayHelpers) => (
            <>
              {values[id] &&
                values[id].map((rec, index) => {
                  return (
                    <>
                      <label
                        className="cursor-pointer label justify-start"
                        key={generateKeyEntity("priviliges", index)}
                      >
                        <input
                          id={`${id}[${index}].value`}
                          name={`${id}[${index}].value`}
                          type="checkbox"
                          checked={rec.value}
                          className={`checkbox ${rec.className}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="label-text ml-1">{rec.displayName}</span>
                      </label>
                    </>
                  );
                })}
            </>
          )}
        />
      </div>
    </>
  );
};

export default PrivilegesField;
