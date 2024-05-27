const express = require("express");
const Admin_Controller = require("../controllers/admin.credential.controller");
const authenticateJWT = require("../middleware/AuthenticateJWT");

const router = express.Router();

router.post("/create", authenticateJWT, Admin_Controller.create);
router.post("/login", Admin_Controller.login);
router.put("/update", authenticateJWT, Admin_Controller.update);
router.delete("/remove/:email", authenticateJWT, Admin_Controller.remove);

module.exports = router;
