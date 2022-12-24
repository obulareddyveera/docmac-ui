import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, useFormikContext } from "formik";

const ClinicServices = () => {
  const [state, setState] = useState({
    name: "",
    price: undefined,
    colour: "",
  });
  const { errors, values } = useFormikContext();

  const { name, price, colour } = state;
  return (
    <>
      <div className="flex flex-col m-4">
        <div className="divider">Clinic services, price details</div>
        <FieldArray
          name="clinicServices"
          render={(arrayHelpers, index) => (
            <>
              <div className="indicator w-full">
                <span className="indicator-item  indicator-bottom m-3 badge badge-primary">
                  {values.clinicServices.length}
                </span>
                <div className="grid place-items-center">
                  <div className="flex flex-wrap p-2">
                    {values.clinicServices.map((entity, index) => {
                      return (
                        <div
                          key={`clinicServices_${index}`}
                          className={`badge badge-info text-white m-1 p-2`}
                          style={{ backgroundColor: entity.colour }}
                        >
                          <FontAwesomeIcon
                            className="inline-block w-4 h-4 stroke-current"
                            onClick={() => arrayHelpers.remove(index)}
                            icon={faClose}
                          />
                          {entity.name} : {entity.price}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 grid-rows-1 md:gap-0 md:input-group">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Clinic Service Name"
                  id={`serviceName`}
                  name={`serviceName`}
                  value={name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Quoted cost"
                  id={`servicePrice`}
                  name={`servicePrice`}
                  value={price}
                  onChange={(e) =>
                    setState({ ...state, price: e.target.value })
                  }
                />
                <select
                  className="select select-bordered"
                  onChange={(e) =>
                    setState({ ...state, colour: e.target.value })
                  }
                >
                  <option disabled selected>
                    Pick Color
                  </option>

                  {[
                    "#0AAFF1",
                    "#0584F2",
                    "#0444BF",
                    "#36688D",
                    "#F3CD0F",
                    "#F49F05",
                    "#93A806",
                    "#A7414A",
                    "#FF6D28",
                    "#D6618F",
                  ].map((clr) => {
                    return <option>{clr}</option>;
                  })}
                </select>
                <button
                  onClick={() => {
                    arrayHelpers.push({ ...state })
                    setState({
                      name: "",
                      price: 0,
                      colour: "",
                    })
                  }}
                  style={{ backgroundColor: colour }}
                  className="btn"
                >
                  Add
                </button>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
};

export default ClinicServices;
