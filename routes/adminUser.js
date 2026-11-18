const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const uploadAvatar = require("../config/uploadAvatar");

const userController = require("../controllers/userController");

router.get("/", authAdmin, userController.index); // tornar pública em user.js e apagar aqui
router.get("/:username", authAdmin, userController.findByUsername); // tornar pública em user.js e apagar aqui

router.get("/edit/:id", authAdmin, userController.edit);
router.put("/edit/:id", authAdmin, uploadAvatar.any(), userController.update);
router.post("/edit/:id/password", authAdmin, userController.updatePassword);
router.post("/edit/:id/avatar", authAdmin, uploadAvatar.any(), userController.updateAvatar);
router.delete("/delete/:id", authAdmin, userController.destroy);

module.exports = router;
