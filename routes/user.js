const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const userController = require("../controllers/userController");

router.get("/", auth, userController.index); // tornar pública
router.get("/:username", auth, userController.findByUsername); // tornar pública

module.exports = router;
