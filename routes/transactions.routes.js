const express = require("express");
const Transaction_Controller = require("../controllers/transactions.controller");

const router = express.Router();

router.get("/txs", Transaction_Controller.fetchTransactions);

module.exports = router;
