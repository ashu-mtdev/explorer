const Response = require("../middleware/Responses");
const Validator = require("../middleware/Validations");
const validator = require("validator");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const BaseSchema = require("../models/admin.transaction.bitcoin.model");
const CustomResponse = require("../middleware/Responses");
require("dotenv").config();

const create = async (req, res) => {
  try {
    const data = await BaseSchema.create({
      ...req.body,
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

const update = async (req, res) => {
  try {
    let data = await BaseSchema.findOneAndUpdate(
      { txid: req.body.txid },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return Response.error(res, "Invalid details provided", data);
    } else {
      return Response.success(res, "Tx Updated", data);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { txid } = req.params;
    const data = await BaseSchema.findOneAndDelete({ txid });
    if (data) Response.success(res, "Data Deleted", data);
    else Response.error(res, "Error while deleting", data);
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};

const get = async (req, res) => {
  try {
    const { txid } = req.params;
    const data = await findBtcTx({ txid });
    if (data.length) Response.success(res, "Data Found", data);
    else Response.error(res, "Error while deleting", data);
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};

const findBtcTx = async (filter) => {
  const data = await BaseSchema.find(filter);
  if (!data) return null;
  else return data;
};

module.exports = {
  create,
  update,
  remove,
  get,
  findBtcTx,
};
