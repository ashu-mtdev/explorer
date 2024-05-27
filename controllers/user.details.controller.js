const Response = require("../middleware/Responses");
const Validator = require("../middleware/Validations");
const validator = require("validator");

const BaseSchema = require("../models/user.details.model");
require("dotenv").config();

const create = async (req, res) => {
  try {
    let { address, name, email } = req.body;
    let reqField = { address, name, email };
    if (!Validator.validateReqField(reqField, res)) return null;
    const validationAddressResult = await Validator.validateAddress(address);
    if (!validationAddressResult.result) {
      return Response.error(
        res,
        "Invalid address: " + validationAddressResult.message
      );
    }
    const validationNameResult = await Validator.validateName(name);
    if (!validationNameResult.result) {
      return Response.error(
        res,
        "Invalid name: " + validationNameResult.message
      );
    }
    if (email)
      if (!validator.isEmail(email)) {
        return Response.error(res, "Invalid email!");
      }
    const data = await BaseSchema.create({
      address: address,
      name: name,
      email: email,
    });
    if (data) {
      Response.success(res, "Data saved", data);
    } else {
      Response.error(res, "Error while saving data", data);
    }
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      Response.error(res, `Already registerd`, error.keyValue);
    } else {
      Response.error(res, "Error while saving data", error.message);
    }
  }
};

const getAll = async (req, res) => {
  try {
    let filter = { ...req.query };
    console.log("searching");
    if (req.query.search) {
      const searchTerm = req.query.search;
      filter = {
        ...filter,
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { address: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }
    let data = await BaseSchema.find(filter).sort({
      createdAt: -1,
    });
    if (!data) return Response.fail(res, "Invalid Credentials", data);
    return Response.success(res, "Data fetched", data);
  } catch (error) {
    return Response.error(res, `Error while fetching data ${error}`, error);
  }
};

const getOneByNameOrAddress = async (req, res) => {
  try {
    // let data = await BaseSchema.findOne(req.body).sort({
    //   createdAt: -1,
    // });
    const { name, address } = req.body;
    let filter = {};
    if (name) {
      filter.name = name;
    }
    if (address) {
      filter.address = address;
    }
    filter = {
      $or: [{ address: { $regex: address, $options: "i" } }],
    };
    // const filter = { name: name };
    const data = await findUser(filter);
    if (!data) return Response.fail(res, "No records found ", data);
    return Response.success(res, "Data fetched", data);
  } catch (error) {
    return Response.error(res, `Error while fetching data ${error}`, error);
  }
};

const findUser = async (filter) => {
  let data = await BaseSchema.findOne(filter).sort({
    createdAt: -1,
  });
  if (!data) return null;
  else return data;
};

const updateUser = async (req, res) => {
  try {
    let { address, name, email } = req.body;
    address = address.toLowerCase();
    const validationAddressResult = await Validator.validateAddress(address);
    if (!validationAddressResult.result) {
      return Response.error(
        res,
        "Invalid address: " + validationAddressResult.message
      );
    }
    if (!validator.isEmail(email)) {
      return Response.error(res, "Invalid email!");
    }
    if (!(await Validator.validateName(name)).result) {
      return Response.error(
        res,
        "Invalid name: " + (await Validator.validateName(name)).message
      );
    } else {
      let data = await BaseSchema.findOneAndUpdate(
        { address },
        { address: address, name: name, email: email },
        { new: true }
      );
      if (!data) {
        return Response.error(res, "Invalid details provided", data);
      } else {
        return Response.success(res, "Updated", data);
      }
    }
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};
const removeUser = async (req, res) => {
  try {
    let { address } = req.params;
    address = address.toLowerCase();
    if (!address) return Response.error(res, "address is requried", null);
    const data = await BaseSchema.findOneAndDelete({ address });
    if (data) Response.success(res, "Data Deleted", data);
    else Response.error(res, "Error while deleting", data);
  } catch (error) {
    console.log(error);
    Response.error(res, error.message);
  }
};

module.exports = {
  create,
  getAll,
  getOneByNameOrAddress,
  findUser,
  updateUser,
  removeUser,
};
