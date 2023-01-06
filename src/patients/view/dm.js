import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { Formik } from "formik";
import { patientDmSchema, patientDmFields, emergencyContactDmFields } from "./dm.schema";
import { Link } from "react-router-dom";

const FrontDeskPatientDml = () => {
  const [state, setState] = useState({ customer: {} });
  const params = useParams();
  const location = useLocation();
  const {
    state: { from },
  } = location;

  useEffect(() => {
    if (params?.customerId === "add") {
      const initVals = {};
      patientDmFields.forEach((rec) => {
        initVals[rec.id] = rec.defaultValue || "";
      });
      emergencyContactDmFields.forEach((rec) => {
        initVals[rec.id] = rec.defaultValue;
      });
      setState((prevState) => {
        return {
          ...prevState,
          customer: initVals,
        };
      });
    }
  }, [params]);

  const handlePatientSave = (vals) => {
    console.log('--== handlePatientSave ', vals)
  }
  return (
    <>
      <div className="grig grid-rows-2 gap-2 md:m-4 md:p-4">
      <Link to={from?.pathname} className="btn btn-sm m-4">
        Back
      </Link>
      <div className="grid grid-cols-1 gap-2 p-2 h-full w-full">
        <Formik
          initialValues={{ ...state.customer }}
          validationSchema={patientDmSchema}
        >
          {({ isValid, touched, values }) => (
            <>
              <div className="flex flex-col w-full border-opacity-50">
                {patientDmFields?.map(rec => {
                  const attrs = {
                    type: rec.type,
                    label: rec.label,
                    placeholder: rec.label,
                    id: rec.id,
                    name: rec.id,
                    value: values[rec.id],
                  };
                  return (
                    <React.Fragment
                      key={rec.id}
                    >
                      <rec.component {...attrs} />
                    </React.Fragment>
                  );
                })}
                <div className="divider">Emergency Contact</div>
                {emergencyContactDmFields?.map(rec => {
                  const attrs = {
                    type: rec.type,
                    label: rec.label,
                    placeholder: rec.label,
                    id: rec.id,
                    name: rec.id,
                    value: values[rec.id],
                  };
                  return (
                    <React.Fragment
                      key={rec.id}
                    >
                      <rec.component {...attrs} />
                    </React.Fragment>
                  );
                })}
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    disabled={!isValid || Object.keys(touched).length === 0}
                    onClick={() => handlePatientSave(values)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
      </div>
    </>
  );
};

export default FrontDeskPatientDml;
