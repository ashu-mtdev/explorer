var jwt = require("jsonwebtoken");
const CustomResponse = require("./Responses");

const { JWT_SECRET } = process.env;

const validateReqField = (fields, res) => {
  try {
    let flag = true;
    for (const key in fields) {
      const element = fields[key];
      const valid =
        element == "undefined" || element == undefined ? false : true;
      if (!valid) {
        res.status(400).send({ success: false, message: `${key} is required` });
        flag = false;
        break;
      }
    }
    return flag;
  } catch (error) {
    error.log("Error validating the required field");
  }
};

const checkPassword = (password) => {
  // Regular expression pattern
  if (password.length < 8) {
    return {
      result: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password)) {
    return {
      result: false,
      message: "Password must contain at least one special character.",
    };
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      result: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      result: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  // Check if the password contains at least one numeric digit
  if (!/\d/.test(password)) {
    return {
      result: false,
      message: "Password must contain at least one numeric digit.",
    };
  }

  // If all requirements are met, return true (password is valid)
  return { result: true, message: "" };
};

const generateToken = async (data) => {
  console.log("------> this is jwt----", JWT_SECRET);
  let token = await jwt.sign(data, JWT_SECRET);
  return token;
};

const verifyAdmin = async (req, res, next) => {
  let { role } = req.user;
  console.log(req.user.role);
  if (role == "ADMIN") {
    next();
  } else {
    CustomResponse.unauthorized(res, "You are not authorized to access API");
  }
};

//Check that string contains only lower case letters
const validateName = async (name) => {
  if (!/^[a-z]+$/.test(name)) {
    return {
      result: false,
      message: `name contains invalid character`,
    };
  }
  return { result: true, message: "" };
};

//Check that string contains only lower case letters and numbers
const validateAddress = async (address) => {
  if (!/^[0-9a-zA-Z]+$/.test(address)) {
    return {
      result: false,
      message: `address contains invalid character`,
    };
  }
  return { result: true, message: "" };
};

const Validation = {
  validateReqField,
  checkPassword,
  generateToken,
  verifyAdmin,
  validateName,
  validateAddress,
};

module.exports = Validation;
