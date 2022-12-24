import * as Yup from "yup";
import DatepickerField from "../../components/datepicker";
import AadharField from "../../components/fields/aadharField";
import GenderInputField from "../../components/fields/genderField";
import MobileField from "../../components/fields/mobileField";
import TextboxField from "../../components/fields/textboxField";

const patientDmFields = [
  { label: "Name", type: "text", id: "patientName", component: TextboxField },
  {
    label: "Email",
    type: "text",
    id: "patientEmail",
    component: TextboxField,
  },
  {
    label: "Gender",
    type: "text",
    id: "patientGender",
    defaultValue: "male",
    component: GenderInputField,
  },
  {
    label: "Mobile",
    type: "text",
    id: "patientMobile",
    component: MobileField,
  },
  {
    label: "Alternate Mobile",
    id: "patientAltMobile",
    type: "text",
    component: MobileField,
  },
  {
    label: "Select Date Of Birth",
    type: "text",
    id: "patientDob",
    component: DatepickerField,
  },
  {
    label: "Aadhar",
    type: "text",
    id: "patientAadhar",
    component: AadharField,
  },
];

const emergencyContactDmFields = [
  {
    label: "Name",
    type: "text",
    id: "emergencyContactName",
    component: TextboxField,
  },
  {
    label: "Relationship",
    type: "text",
    id: "emergencyContactRelationship",
    component: TextboxField,
  },
  {
    label: "Mobile",
    type: "text",
    id: "emergencyContactMobile",
    component: MobileField,
  },
];

const patientDmSchema = Yup.object().shape({
  patientName: Yup.string().required("Required"),
  patientEmail: Yup.string()
    .nullable()
    .notRequired()
    .test("patientEmail", "Please enter valid email", (value) => {
      return (
        value &&
        value.length > 0 &&
        value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      );
    }),
  patientGender: Yup.string().required("Required"),
  patientMobile: Yup.string()
    .required("Required")
    .test("patientMobile", "Please enter valid mobile number", (value) => {
      return (
        value &&
        value.length > 0 &&
        value
          .replace(/\s+/g, "")
          ?.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)
      );
    }),
  patientAltMobile: Yup.string()
    .nullable()
    .notRequired()
    .test("patientAltMobile", "Please enter valid mobile number", (value) => {
      if (value && value.replace(/\s+/g, "").length > 3) {
        return value
          .replace(/\s+/g, "")
          ?.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/);
      }
      return true;
    }),
  patientDob: Yup.string().required("Required"),
  patientAadhar: Yup.string()
    .required("Required")
    .test("patientAadhar", "Please enter valid Aadhar number", (value) => {
      console.log("--== patientAadhar :: value ", value);
      if (value && value.replace(/\s+/g, "").length > 0) {
        let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
        return regex.test(value);
      }
      return true;
    }),
  emergencyContactName: Yup.string().required("Required"),
  emergencyContactRelationship: Yup.string().required("Required"),
  emergencyContactMobile: Yup.string()
    .required("Required")
    .test(
      "emergencyContactMobile",
      "Please enter valid mobile number",
      (value) => {
        return (
          value &&
          value.length > 0 &&
          value
            .replace(/\s+/g, "")
            ?.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)
        );
      }
    ),
});

export { patientDmSchema, patientDmFields, emergencyContactDmFields };
