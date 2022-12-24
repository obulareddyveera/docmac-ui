import React from "react";
import { useFormikContext } from "formik";
import { generateKeyEntity } from "../../services/utils";

const PaymentDetailField = ({fields}) => {
  const { touched, setFieldValue, handleChange, handleBlur, values, ...formik } =
    useFormikContext();
  const errors = { ...formik.errors };
  return (
    <>
      <div className="divider">Payment Details</div>
      <fieldset className="grid grid-cols-2 gap-1 m-2">
        {[
          {
            displayName: "Daily Wages",
            name: "paymentBase",
            value: "dailyWages",
          },
          {
            displayName: "Montly Wages",
            name: "paymentBase",
            value: "monthlyWages",
          },
        ].map((rec, index) => {
          return (
            <div key={generateKeyEntity("paymentBaseField", index)}>
              <input
                type="radio"
                name={rec.name}
                value={rec.value}
                id={rec.value}
                className="peer hidden"
                onChange={() => {}}
                checked={rec.value === values.paymentBase}
              />

              <button
                htmlFor={rec.value}
                className="w-full flex bg-white cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                onClick={() => setFieldValue("paymentBase", rec.value)}
              >
                <p className="text-sm font-medium">{rec.displayName}</p>
              </button>
            </div>
          );
        })}
      </fieldset>
      {fields.map((rec) => {
        const attrs = {
          type: rec.type,
          label: rec.label,
          placeholder: rec.label,
          id: rec.id,
          name: rec.id,
          value: values[rec.id],
        };
        return (
          <React.Fragment key={rec.id}>
            <rec.component {...attrs} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PaymentDetailField;
