const express = require("express");
const Admin_Transaction = require("../controllers/admin.transaction.ethereum.controller");
const authenticateJWT = require("../middleware/AuthenticateJWT");

const router = express.Router();

router.post("/create", authenticateJWT, Admin_Transaction.create);
router.put("/update", authenticateJWT, Admin_Transaction.update);
router.delete("/remove/:hash", authenticateJWT, Admin_Transaction.remove);
router.get("/get/:hash", authenticateJWT, Admin_Transaction.get);

module.exports = router;
