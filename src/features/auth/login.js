import React, { useEffect } from "react";
import { Formik } from "formik";

import HeaderLogo from "../../components/logo/header";
import TextboxField from "../../components/fields/textboxField";
import { loginClinicAsync } from "./auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import DocMacFreeCaptionLogo from "../../components/logo/freeCapLogo";
import MobileField from "../../components/fields/mobileField";

const LoginFeature = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { exception } = useSelector((state) => state.auth);
  const handleLoginAction = (values) => {
    dispatch(loginClinicAsync({...values, mobileNumber: values.mobileNumber.replaceAll(' ', '').trim()}));
  };
  const token = sessionStorage?.getItem("docMacTokens");

  useEffect(() => {
    if (token && JSON.parse(token) && JSON.parse(token).accessToken) {
      navigate("/frontdesk");
    }
  }, [token]);

  return (
    <>
      <div className="hero min-h-screen bg-portalBg">
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <div className="text-5xl font-bold">
              <DocMacFreeCaptionLogo />
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <div className="card-body">
              {exception && (
                <div className="bg-red-400 text-center text-white font-semibold p-3">
                  <span>
                    Invalid credentials, please check your email or docMac
                    portal password
                  </span>
                </div>
              )}
              <Formik
                initialValues={{
                  mobileNumber: "",
                  email: "",
                  password: "",
                  isEmailAcceptedSignIn: false,
                }}
                validate={(values) => {
                  const errors = {};
                  if (values.isEmailAcceptedSignIn) {
                    if (
                      !values.email ||
                      (values.email && values.email.trim().length === 0)
                    ) {
                      errors.email = "Required";
                    } else if (
                      !values.email.match(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                    ) {
                      errors.email = "Please enter valid Email Address";
                    }
                  } else {
                    if (
                      !values.mobileNumber ||
                      (values.mobileNumber &&
                        values.mobileNumber.replaceAll(" ", "").trim().length !==
                          10)
                    ) {
                      errors.email = "Required";
                    }
                  }
                  if (
                    !values.password ||
                    (values.password && values.password.trim().length === 0)
                  ) {
                    errors.password = "Required";
                  } else if (values.password.length < 4) {
                    errors.password = "Please enter at least 4 digit passcode";
                  }

                  return errors;
                }}
              >
                {({ isValid, touched, values, handleBlur, handleChange }) => (
                  <>
                    <div className="flex flex-col w-full border-opacity-50">
                      <div className="flex justify-end">
                        <div className="form-control">
                          <label className="cursor-pointer label justify-center">
                            <input
                              id="isEmailAcceptedSignIn"
                              name="isEmailAcceptedSignIn"
                              type="checkbox"
                              className="toggle toggle-accent"
                              checked={values.isEmailAcceptedSignIn}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <span className="label-text ml-1">
                              Email accepted sign-in
                            </span>
                          </label>
                        </div>
                      </div>
                      <div>
                        {values.isEmailAcceptedSignIn ? (
                          <TextboxField
                            type="email"
                            label="Email"
                            placeholder="Email"
                            id="email"
                            name="email"
                          />
                        ) : (
                          <>
                            <MobileField
                              type="text"
                              label="Phone Number"
                              placeholder="Phone Number"
                              id="mobileNumber"
                              name="mobileNumber"
                            />
                          </>
                        )}
                        <TextboxField
                          type="password"
                          label="Password"
                          placeholder="Password"
                          id="password"
                          name="password"
                        />
                        <div className="form-control mt-6">
                          <button
                            className="btn btn-success text-white"
                            disabled={
                              !isValid || Object.keys(touched).length === 0
                            }
                            onClick={() => handleLoginAction(values)}
                          >
                            Login
                          </button>
                        </div>
                      </div>

                      <div className="divider">OR</div>
                      <div className="form-control">
                        <Link to="/register" className="btn btn-secondary">
                          Register
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFeature;
