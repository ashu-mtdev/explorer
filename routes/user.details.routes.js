const express = require("express");
const User_Controller = require("../controllers/user.details.controller");
const authenticateJWT = require("../middleware/AuthenticateJWT");

const router = express.Router();

router.post("/create", authenticateJWT, User_Controller.create);
router.get("/getAll", authenticateJWT, User_Controller.getAll);
router.get("/getOne", authenticateJWT, User_Controller.getOneByNameOrAddress);
router.put("/update", authenticateJWT, User_Controller.updateUser);
router.delete("/remove/:address", authenticateJWT, User_Controller.removeUser);

module.exports = router;
