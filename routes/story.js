const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const uploadCapa = require("../config/uploadCapa");

const storyController = require("../controllers/storyController");
const chapterRouter = require("./chapter");

router.get("/", auth, storyController.index); // tornar pública
router.get("/new", auth, storyController.create);
router.post("/new", auth, storyController.store);
router.get("/:directory/edit", auth, storyController.edit);
router.put("/:directory/edit", auth, uploadCapa.any(), storyController.update);
router.delete("/:directory/delete", auth, storyController.destroy); // admin pode excluir
router.get("/:directory", auth, storyController.findByDirectory); // tornar pública

router.use("/", chapterRouter);

module.exports = router;
