import React from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import DocMacFreeCaptionLogo from "../../components/logo/freeCapLogo";
import HeaderLogo from "../../components/logo/header";
import NavbarLogo from "../../components/logo/navbar";
import MobileField from "../../components/fields/mobileField";
import TextboxField from "../../components/fields/textboxField";

const ExternalLinkFeature = () => {
  const params = useParams();

  return (
    <>
      <div className="flex flex-col md:justify-center md:align-center h-screen bg-[#eff0ea] md:bg-base-100">
        <div className="flex justify-center items-center">
          <div className="card lg:card-side bg-[#eff0ea]">
            <figure>
              <img src="/banners/medicalPeopleStaff.jpg" alt="Album" />
            </figure>
            <div className="card-body">
              {params && params.mobileNumber && (
                <Formik
                  initialValues={{
                    mobileNumber: params.mobileNumber,
                    password: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (
                      !values.mobileNumber ||
                      (values.mobileNumber &&
                        values.mobileNumber.replaceAll(" ", "").trim()
                          .length !== 10)
                    ) {
                      errors.email = "Required";
                    }
                    if (
                      !values.password ||
                      (values.password && values.password.trim().length === 0)
                    ) {
                      errors.password = "Required";
                    } else if (values.password.length < 4) {
                      errors.password =
                        "Please enter at least 4 digit passcode";
                    }

                    return errors;
                  }}
                >
                  {({ isValid, touched, values, handleBlur, handleChange }) => (
                    <>
                      <div className="flex flex-col items-center">
                        <h2 className="card-title border-b-2 border-base-100 mb-4">
                          <NavbarLogo />
                        </h2>
                        <MobileField
                          type="text"
                          label="Phone Number"
                          placeholder="Phone Number"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={values.mobileNumber}
                          disabled
                        />
                        <TextboxField
                          type="password"
                          label="Password"
                          placeholder="Password"
                          id="password"
                          name="password"
                          value={values.password}
                        />
                        <button
                          className="btn btn-success w-full mt-4 "
                          disabled={
                            !isValid || Object.keys(touched).length === 0
                          }
                        >
                          <span className="text-white">Login</span>
                        </button>
                      </div>
                    </>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExternalLinkFeature;
