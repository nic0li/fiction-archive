const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const chapterController = require("../controllers/chapterController");

router.get("/:directory/chapters", auth, chapterController.index); // tornar pública
router.get("/:directory/chapter", auth, chapterController.index); // tornar pública
router.get("/:directory/chapter/new", auth, chapterController.create);
router.post("/:directory/chapter/new", auth, chapterController.store);
router.get("/:directory/chapter/:chapterId/edit", auth, chapterController.edit);
router.put("/:directory/chapter/:chapterId/edit", auth, chapterController.update);
router.delete("/:directory/chapter/:chapterId/delete", auth, chapterController.destroy); // admin pode excluir
router.get("/:directory/chapter/:chapterId", auth, chapterController.findById); // tornar pública

module.exports = router;
