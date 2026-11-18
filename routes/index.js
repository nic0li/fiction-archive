const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");
const validacaoCadastro = require("../middlewares/validacaoCadastro");

const uploadAvatar = require("../config/uploadAvatar");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const storyController = require("../controllers/storyController");
const chapterController = require("../controllers/chapterController");

router.get("/", authController.index);

router.get("/login", authController.checkSession);
router.post("/login", authController.login);

router.get("/home", auth, authController.home);
router.get("/logout", auth, authController.logout);

router.get("/register", userController.create);
router.post("/register", validacaoCadastro, userController.store);

router.get("/settings", auth, userController.edit); // separar página de alterar password
router.put("/settings", auth, uploadAvatar.any(), userController.update);
router.post("/settings/password", auth, userController.updatePassword);
router.post("/settings/avatar", auth, uploadAvatar.any(), userController.updateAvatar);
router.delete("/delete/:authUserSession", auth, userController.destroy);

router.get("/mystories", auth, storyController.findStoriesByUser);
router.get("/mystories/:directory/chapters", auth, chapterController.findChaptersByStory);
router.get("/mystories/:directory/chapter", auth, chapterController.findChaptersByStory);

router.get("/users", auth, userController.index); // tornar pública
router.get("/stories", auth, storyController.index); // tornar pública

module.exports = router;
