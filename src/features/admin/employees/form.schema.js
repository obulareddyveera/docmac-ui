import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .nullable()
    .notRequired()
    .test("email", "Please enter valid email", (value) => {
      return (
        value &&
        value.length > 0 &&
        value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      );
    }),
  gender: Yup.string().required("Required"),
  mobile: Yup.string()
    .required("Required")
    .test("mobile", "Please enter valid mobile number", (value) => {
      return (
        value &&
        value.length > 0 &&
        value
          .replace(/\s+/g, "")
          ?.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)
      );
    }),
  altMobile: Yup.string()
    .nullable()
    .notRequired()
    .test("altMobile", "Please enter valid mobile number", (value) => {
      if (value && value.replace(/\s+/g, "").length > 3) {
        return value
          .replace(/\s+/g, "")
          ?.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/);
      }
      return true;
    }),
  dob: Yup.string().required("Required"),
  aadhar: Yup.string()
    .required("Required")
    .test("aadhar", "Please enter valid Aadhar number", (value) => {
      if (value && value.replace(/\s+/g, "").length > 0) {
        let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
        return regex.test(value);
      }
      return true;
    }),
  panNumber: Yup.string()
    .required("Required")
    .test("panNumber", "Please enter valid PAN number", (value) => {
      if (value && value.replace(/\s+/g, "").length > 0) {
        let regex = new RegExp(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/);
        return regex.test(value);
      }
      return true;
    }),
  addNewAccount: Yup.object().shape({
    bankName: Yup.string().required("Required"),
    accountNo: Yup.string().required("Required"),
    ifscCode: Yup.string().required("Required"),
  }),
  wages: Yup.string().required("Required"),
  referal: Yup.string().required("Required"),
});