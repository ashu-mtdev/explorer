const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
mongoose.set("strictQuery", true);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let checkConn = async () => await mongoose.connect(MONGO_URI, options);

let connection = checkConn();
if (connection) {
  console.log("Database Connected.");
} else {
  console.log("Error while connecting database.");
}
