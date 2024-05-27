const express = require("express");
const Dashboard_Controller = require("../controllers/dashboard.controller");
const authenticateJWT = require("../middleware/AuthenticateJWT");

const router = express.Router();

router.get("/stats", Dashboard_Controller.getLatestStats);

module.exports = router;
