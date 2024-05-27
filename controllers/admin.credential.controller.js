const Response = require("../middleware/Responses");
const Validator = require("../middleware/Validations");
const validator = require("validator");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const BaseSchema = require("../models/admin.credential.model");
const CustomResponse = require("../middleware/Responses");
require("dotenv").config();
// const { SECRET_KEY } = process.env;
// console.log(SECRET_KEY);
const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    let reqField = { email, password };
    if (!Validator.validateReqField(reqField, res)) return null;
    if (!validator.isEmail(reqField.email)) {
      return Response.error(res, "Invalid email!");
    }
    const validationPasswordResult = Validator.checkPassword(reqField.password);
    if (!validationPasswordResult.result) {
      return Response.error(
        res,
        "Invalid password: " + validationPasswordResult.message
      );
    }
    const data = await BaseSchema.create({
      ...req.body
    });
    if (data) {
      Response.success(res, "Data saved", data);
    } else {
      Response.error(res, "Error while saving data", data);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Error while saving data", error.message);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    let reqField = { email, password };
    if (!Validator.validateReqField(reqField, res)) return null;
    let data = await BaseSchema.findOne(req.query).sort({
      createdAt: -1
    });
    if (!data) return Response.fail(res, "Invalid Credentials", data);
    const token = jwt.sign(
      {
        email: data.email,
        password: data.password
      },
      JWT_SECRET
    );
    data._doc.token = token;
    Response.success(res, "Data fetched", data);
  } catch (error) {
    return Response.error(res, `Error while fetching data ${error}`, error);
  }
};

const update = async (req, res) => {
  try {
    const { email, password, currentPassword } = req.body;
    let reqField = { email, password, currentPassword };

    if (!Validator.validateReqField(reqField, res)) return null;
    if (!validator.isEmail(reqField.email)) {
      return Response.error(res, "Invalid email!");
    }
    if (currentPassword == password)
      return CustomResponse.error(
        res,
        "Current Password and New Password must be different."
      );
    const validationPasswordResult = Validator.checkPassword(reqField.password);
    if (!validationPasswordResult.result) {
      return Response.error(
        res,
        "Invalid password: " + validationPasswordResult.message
      );
    } else {
      let data = await BaseSchema.findOneAndUpdate(
        { email, password: currentPassword },
        { password },
        { new: true }
      );
      console.log(data, "<<<thisisdat");
      if (!data) {
        return Response.error(res, "Invalid details provided", data);
      } else {
        return Response.success(res, "Password Updated", data);
      }
    }
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};
const remove = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return Response.error(res, "email is requried", null);
    const data = await BaseSchema.findOneAndDelete({ email });
    if (data) Response.success(res, "Data Deleted", data);
    else Response.error(res, "Error while deleting", data);
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};

module.exports = {
  create,
  login,
  update,
  remove
};
