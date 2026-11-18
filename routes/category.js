const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const categoryController = require("../controllers/categoryController");

router.get("/", authAdmin, categoryController.index);
router.get("/new", authAdmin, categoryController.new);
router.post("/new", authAdmin, categoryController.store);
router.get("/edit/:id", authAdmin, categoryController.edit);
router.put("/edit/:id", authAdmin, categoryController.update);
router.delete("/delete/:id", authAdmin, categoryController.destroy);

module.exports = router;
