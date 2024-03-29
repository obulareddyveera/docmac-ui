export const buildApiEmployeePayload = (values) => {
  const privsList = [];
  values.privileges.forEach((item) => {
    if (item.isActive) {
      privsList.push({ name: item.name, colour: "privilege" });
    }
  });
  values.roles.forEach((item) => {
    if (item.isActive) {
      privsList.push({ name: item.name, colour: "role" });
    }
  });

  return {
    email: values.email,
    name: values.name,
    mobile: values.mobile?.replaceAll(' ', '').trim(),
    altMobile: values.altMobile?.replaceAll(' ', '').trim(),
    password: "1010",
    gender: values.gender,
    wages: values.wages,
    referal: values.referal,
    status: "DRAFT",
    doj: values.doj,
    dob: values.dob,
    aadhar: values.aadhar,
    panNumber: values.panNumber,
    clinicId: values.clinicId,
    type: values.type,
    Privs: privsList,
    ProfileSnap: values.ProfileSnap.map((entity) => {
      return {
        title: entity.title,
        details: entity.details,
      };
    }),
    PaymentDetails: values.PaymentDetails.map((entity) => {
      return {
        bankName: entity.bankName,
        accountNo: entity.accountNo,
        ifscCode: entity.ifscCode,
        isActive: entity.isActive,
      };
    }),
  };
};
