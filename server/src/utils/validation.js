const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Both Names Are Required!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Is Not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password Enter Must Be Strong!");
  }
};

const validateProfileEditData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "photoURL",
    "about",
    "gender",
    "skills",
  ];

  const isEditAllowedValidFields = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowedValidFields;
};

module.exports = { validateSignUpData, validateProfileEditData };
