const express = require("express");
const Table_Controler = require("../controllers/table.controler");
const authenticateJWT = require("../middleware/AuthenticateJWT");

const router = express.Router();

router.post("/create", authenticateJWT, Table_Controler.create);
router.get("/get", Table_Controler.get);
router.put("/update", authenticateJWT, Table_Controler.update);
router.delete("/remove/:_id", authenticateJWT, Table_Controler.remove);

module.exports = router;
