import DatepickerField from "../../../components/datepicker";
import AadharField from "../../../components/fields/aadharField";
import GenderInputField from "../../../components/fields/genderField";
import MobileField from "../../../components/fields/mobileField";
import PanNumberField from "../../../components/fields/panNumberField";
import TextareaField from "../../../components/fields/textareaField";
import TextboxField from "../../../components/fields/textboxField";

export const generalFields = [
  {
    label: "Name",
    type: "text",
    id: "name",
    component: TextboxField,
    mockValue: "Manoranjan Reddy.O",
  },
  {
    label: "Email",
    type: "text",
    id: "email",
    component: TextboxField,
    mockValue: "OMR@gmail.com",
  },
  {
    label: "Gender",
    type: "text",
    id: "gender",
    component: GenderInputField,
    mockValue: "male",
    defaultValue: "male",
  },
  {
    label: "Mobile",
    type: "text",
    id: "mobile",
    component: MobileField,
    mockValue: "+919440919222",
  },
  {
    label: "Alternate Mobile",
    id: "altMobile",
    type: "text",
    component: MobileField,
    mockValue: "+919440918222",
  },
  {
    label: "Select Date Of Birth",
    type: "text",
    id: "dob",
    component: DatepickerField,
    mockValue: new Date("10/10/1983"),
  },
  {
    label: "Aadhar",
    type: "text",
    id: "aadhar",
    component: AadharField,
    mockValue: "944091922278",
  },
  {
    label: "Pan Number",
    type: "text",
    id: "panNumber",
    component: PanNumberField,
    mockValue: "AAKPK9987K",
  },
];

export const qualificationRoles = [
  {
    name: "Front Desk",
    colour: "checkbox-secondary",
    isActive: false,
  },
  { name: "Doctor Desk", colour: "checkbox-info", isActive: false },
  { name: "Admin Desk", colour: "checkbox-primary", isActive: false },
  { name: "Accounts", colour: "checkbox-success", isActive: false },
];
export const qualificationPrivileges = [
  {
    name: "Cleaning service",
    colour: "checkbox-success",
    isActive: false,
  },
  {
    name: "Leave approvals",
    colour: "checkbox-info",
    isActive: false,
  },
];

export const qualificationOptions = [
  {
    displayName: "Graduation",
    val: "Graduation",
    id: "graduation",
    isActive: true,
    seq: 1,
  },
  {
    displayName: "Post Graduation",
    val: "Post Graduation",
    id: "postGraduation",
    seq: 2,
  },
  {
    displayName: "Specialization",
    val: "Specialization",
    id: "specialization",
    seq: 3,
  },
  {
    displayName: "Seminars",
    val: "Seminars",
    id: "seminars",
    seq: 4,
  },
  {
    displayName: "Certifications",
    val: "Certifications",
    id: "certifications",
    seq: 5,
  },
  {
    displayName: "About",
    val: "About",
    id: "about",
    seq: 6,
  },
];

export const isValidDataEntity = (entity, noOfFields) => {
  const validFields = [];
  Object.keys(entity).keys((rec) => {
    if (typeof entity[rec] === Boolean && entity[rec]) {
      validFields.push(rec);
    }
  });

  return (
    validFields.length === Object.keys(entity).keys().length &&
    Object.keys(entity).keys().length === noOfFields
  );
};

export const getActiveStatusRecords = (records) => {
  return records.filter((rec) => rec.isActive);
};

export const getQualificationRecComponent = (id, values) => {
  const selectedRec = qualificationOptions.find((entity) => entity.id === id);

  const isInvalidId = values.ProfileSnap.find((entity) => entity.id === id);

  if (selectedRec && ["about", "seminars"].includes(id) && !isInvalidId) {
    const fieldProps = {
      id: selectedRec.id,
      name: selectedRec.id,
      value: values[selectedRec.id] || "",
      placeholder: `Enter ${selectedRec.displayName} details`,
      hideLabel: true,
    };
    return <TextareaField {...fieldProps} />;
  } else if (
    selectedRec &&
    [
      "certifications",
      "specialization",
      "postGraduation",
      "graduation",
    ].includes(id) &&
    !isInvalidId
  ) {
    const fieldProps = {
      id: selectedRec.id,
      name: selectedRec.id,
      value: values[selectedRec.id] || "",
      placeholder: `Enter ${selectedRec.displayName} details`,
      hideLabel: true,
    };
    return <TextboxField {...fieldProps} />;
  } else {
    return <TextboxField hideLabel disabled={true} value={"Select a title"} />;
  }
};

export const getAddInitValues = (env) => {
  const initVals = {};
  generalFields.forEach((rec) => {
    initVals[rec.id] =
      env === "development" ? rec.mockValue : rec.defaultValue || "";
  });

  return initVals;
};

