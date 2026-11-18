const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const chapterController = require("../controllers/chapterController");

router.get("/:directory/chapters", authAdmin, chapterController.index); // tornar pública em chapter.js e apagar aqui
router.get("/:directory/chapter", authAdmin, chapterController.index); // tornar pública em chapter.js e apagar aqui

router.delete("/:directory/chapter/:chapterId/delete", authAdmin, chapterController.destroy);

router.get("/:directory/chapter/:chapterId", authAdmin, chapterController.findById); // tornar pública em chapter.js e apagar aqui

module.exports = router;
