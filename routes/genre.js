const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const genreController = require("../controllers/genreController");

router.get("/", authAdmin, genreController.index);
router.get("/new", authAdmin, genreController.new);
router.post("/new", authAdmin, genreController.store);
router.get("/edit/:id", authAdmin, genreController.edit);
router.put("/edit/:id", authAdmin, genreController.update);
router.delete("/delete/:id", authAdmin, genreController.destroy);

module.exports = router;
