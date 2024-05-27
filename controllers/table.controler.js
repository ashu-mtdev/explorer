const Response = require("../middleware/Responses");
const Validator = require("../middleware/Validations");
const validator = require("validator");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const BaseSchema = require("../models/table.model");
const CustomResponse = require("../middleware/Responses");
require("dotenv").config();
// const { SECRET_KEY } = process.env;
// console.log(SECRET_KEY);

const create = async (req, res) => {
  try {
    if (!req.body.ethereum && !req.body.bitcoin) {
      return Response.error(res, "Invalid body data");
    }
    console.log(req.body);
    // return null;

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
const get = async (req, res) => {
  try {
    const data = await BaseSchema.find(req.query);
    if (data) {
      Response.success(res, "Data Fetched", data);
    } else {
      Response.error(res, "Error while saving data", data);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Error while saving data", error.message);
  }
};
const update = async (req, res) => {
  try {
    if (!req.body._id) {
      return Response.error(res, "Id is required");
    }
    if (!req.body.ethereum && !req.body.bitcoin) {
      return Response.error(res, "Invalid body data");
    }

    const data = await BaseSchema.findByIdAndUpdate(
      req.body._id,
      {
        ...req.body
      },
      { new: true }
    );
    if (data) {
      Response.success(res, "Data saved", data);
    } else {
      Response.error(res, "Error while saving data", data);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};
const remove = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) return Response.error(res, "_id is requried", null);
    const data = await BaseSchema.findByIdAndDelete(_id);
    if (data) Response.success(res, "Data Deleted", data);
    else Response.error(res, "Error while deleting", data);
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};

module.exports = {
  create,
  get,
  update,
  remove
};
