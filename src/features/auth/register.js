import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import ClinicServices from "../../components/fields/clinicServices";
import TextareaField from "../../components/fields/textareaField";
import TextboxField from "../../components/fields/textboxField";
import { checkDuplicateEmailAsync, registerClinicAsync } from "./auth.slice";
import { Link } from "react-router-dom";
import DocMacFreeCaptionLogo from "../../components/logo/freeCapLogo";

const RegisterAuthFeature = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const { duplicateEmails, person, clinic } = useSelector(
    (state) => state.auth
  );
  const docMacTokens = sessionStorage.getItem("docMacTokens");

  useEffect(() => {
    if (
      docMacTokens &&
      JSON.parse(docMacTokens) &&
      JSON.parse(docMacTokens).accessToken
    ) {
      navigate("/frontdesk");
    }
  }, [docMacTokens, person, clinic]);

  const handleRegisterClinic = (params) => {
    setState({ ...state, values: params });
    dispatch(checkDuplicateEmailAsync(params.primaryContactEmail));
  };
  useEffect(() => {
    if (duplicateEmails && duplicateEmails.length > 0) {
      setState({
        ...state,
        errors: { primaryContactEmail: "Email already registered" },
      });
    } else if (duplicateEmails && duplicateEmails.length === 0) {
      dispatch(registerClinicAsync(state.values));
    }
  }, [duplicateEmails]);

  return (
    <>
      <section className="bg-portalBg">
        <div className="mx-auto max-w-screen-xl min-h-screen px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <DocMacFreeCaptionLogo />
          </div>
          <div className="grid grid-cols-1 gap-x-16 gap-y-8">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <Formik
                initialValues={{
                  clinicName: "",
                  clinicAddress: "",
                  clinicServices: [
                    {
                      name: "General",
                      colour: "#10A19D",
                      price: 800,
                    },
                  ],
                  personRoles: [
                    {
                      name: "Admin",
                      colour: "#BB1924",
                    },
                  ],
                  primaryContactName: "",
                  primaryContactMobile: "",
                  primaryContactEmail: "",
                  primaryContactPassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (
                    !values.clinicName ||
                    (values.clinicName && values.clinicName.trim().length === 0)
                  ) {
                    errors.clinicName = "Required";
                  }
                  if (
                    !values.clinicAddress ||
                    (values.clinicAddress &&
                      values.clinicAddress.trim().length === 0)
                  ) {
                    errors.clinicAddress = "Required";
                  }
                  if (
                    !values.primaryContactName ||
                    (values.primaryContactName &&
                      values.primaryContactName.trim().length === 0)
                  ) {
                    errors.primaryContactName = "Required";
                  }
                  if (
                    !values.primaryContactMobile ||
                    (values.primaryContactMobile &&
                      values.primaryContactMobile.trim().length === 0)
                  ) {
                    errors.primaryContactMobile = "Required";
                  } else if (
                    !values.primaryContactMobile.match(
                      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
                    )
                  ) {
                    errors.primaryContactMobile =
                      "Please enter valid Mobile Number";
                  }
                  if (
                    !values.primaryContactEmail ||
                    (values.primaryContactEmail &&
                      values.primaryContactEmail.trim().length === 0)
                  ) {
                    errors.primaryContactEmail = "Required";
                  } else if (
                    !values.primaryContactEmail.match(
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                  ) {
                    errors.primaryContactEmail =
                      "Please enter valid Email Address";
                  }
                  if (
                    !values.primaryContactPassword ||
                    (values.primaryContactPassword &&
                      values.primaryContactPassword.trim().length === 0)
                  ) {
                    errors.primaryContactPassword = "Required";
                  } else if (values.primaryContactPassword.length < 8) {
                    errors.primaryContactPassword =
                      "Please enter at least 8 digit passcode";
                  }

                  return errors;
                }}
              >
                {({ isValid, touched, values }) => (
                  <>
                    <div className="space-y-4">
                      <div className="flex flex-col w-full border-opacity-50">
                        <TextboxField
                          label="Clinic Name"
                          placeholder="Clinic Name"
                          id="clinicName"
                          name="clinicName"
                        />
                        <TextareaField
                          label="Clinic Address"
                          placeholder="Clinic Address"
                          id="clinicAddress"
                          name="clinicAddress"
                        />
                        <ClinicServices />
                        <div className="divider">Primary Contact</div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <TextboxField
                            label="Name"
                            placeholder="Name"
                            id="primaryContactName"
                            name="primaryContactName"
                          />
                          <TextboxField
                            type="password"
                            label="Password"
                            placeholder="Password"
                            id="primaryContactPassword"
                            name="primaryContactPassword"
                          />
                          <TextboxField
                            type="email"
                            label="Email"
                            placeholder="Email"
                            id="primaryContactEmail"
                            name="primaryContactEmail"
                            state={state}
                          />
                          <TextboxField
                            label="Mobile"
                            placeholder="Mobile"
                            id="primaryContactMobile"
                            name="primaryContactMobile"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Link to="/" className="btn btn-default btn-sm">
                          <span className="font-medium"> Cancel </span>
                        </Link>
                        <button
                          className="btn btn-primary btn-sm"
                          disabled={
                            !isValid || Object.keys(touched).length === 0
                          }
                          onClick={() => handleRegisterClinic(values)}
                        >
                          <span className="font-medium"> Register </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterAuthFeature;
