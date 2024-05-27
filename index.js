// ------------------BASE TEMPLATE-----------------------
require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
require("./connectDb");
app.use(cors({ origin: true, credentials: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req._parsedUrl.path, "<<<<< CURRENT API CALL");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// -------------------------------------- REQUIRE ROUTES-----------------------
const AdminCredentialRoutes = require("./routes/admin.credential.routes");
const UserDetailsRoutes = require("./routes/user.details.routes");
const DashboardRoutes = require("./routes/dashboard.routes");
const TransactionRoutes = require("./routes/transactions.routes");
const TableRoutes = require("./routes/table.routes");
const AdminTxEthRoutes = require("./routes/admin.transaction.ethereum.routes");
const AdminTxBtcRoutes = require("./routes/admin.transaction.bitcoin.routes");
// MANAGE CONTROLERS

app.use("/admin", AdminCredentialRoutes);
app.use("/user", UserDetailsRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/txs", TransactionRoutes);
app.use("/table", TableRoutes);
app.use("/admin-tx-eth-controller", AdminTxEthRoutes);
app.use("/admin-tx-btc-controller", AdminTxBtcRoutes);

app.listen(PORT, () => console.log("Admin Server is running on PORT:", PORT));

module.exports = app;
