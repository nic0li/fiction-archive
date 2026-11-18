const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const ratingController = require("../controllers/ratingController");

router.get("/", authAdmin, ratingController.index);
router.get("/new", authAdmin, ratingController.new);
router.post("/new", authAdmin, ratingController.store);
router.get("/edit/:id", authAdmin, ratingController.edit);
router.put("/edit/:id", authAdmin, ratingController.update);
router.delete("/delete/:id", authAdmin, ratingController.destroy);

module.exports = router;
