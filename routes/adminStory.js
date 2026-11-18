const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const storyController = require("../controllers/storyController");
const chapterRouter = require("./chapter");

router.get("/", authAdmin, storyController.index); // tornar pública em story.js e apagar aqui

router.delete("/:directory/delete", authAdmin, storyController.destroy);

router.get("/:directory", authAdmin, storyController.findByDirectory); // tornar pública em story.js e apagar aqui

router.use("/", chapterRouter);

module.exports = router;
