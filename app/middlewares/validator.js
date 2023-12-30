const { validationResult, body, param } = require("express-validator");

exports.validator = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      errors: errors.array(),
      status: "error",
      message: "not valid!",
      success: false,
    });
  };
};

exports.idValidator = (location = "body", valid = "id") => {
  return location == "body"
    ? body(valid).trim().toInt().isInt()
    : param(valid).trim().toInt().isInt();
};

exports.passValidator = (location = "body", valid = "password") => {
  return location == "body"
    ? body(valid).trim().isLength({ min: 8, max: 16 })
    : param(valid).trim().isLength({ min: 8, max: 16 });
};
exports.emailValidator = (location = "body", valid = "email") => {
  return location == "body"
    ? body(valid).trim().isEmail().isLength({ max: 80 })
    : param(valid).trim().isEmail().isLength({ max: 80 });
};

exports.customMadeValidator = (valid, location = "body") => {
  return location == "body" ? body(valid).trim() : param(valid).trim();
};

exports.phoneNumberValidator = (
  compulsion,
  location = "body",
  valid = "phone"
) => {
  if (location == "body") {
    return body(valid)
      .trim()
      .custom((value) => {
        if (compulsion == false && value == "") {
          return true;
        }
        if (!isIranianPhoneNumber(value)) {
          throw new Error("Invalid Iranian phone number");
        }
        return true;
      });
  }
  return param(valid)
    .trim()
    .custom((value) => {
      if (compulsion == false && value == "") {
        return true;
      }
      if (!isIranianPhoneNumber(value)) {
        throw new Error("Invalid Iranian phone number");
      }
      return true;
    });
};
const isIranianPhoneNumber = (value) => {
  return /^09\d{9}$/.test(value);
};
