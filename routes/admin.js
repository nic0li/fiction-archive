const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const adminController = require("../controllers/adminController");

const genreController = require("../controllers/genreController");
const categoryController = require("../controllers/categoryController");
const ratingController = require("../controllers/ratingController");

const userController = require("../controllers/userController");
const storyController = require("../controllers/storyController");
const chapterController = require("../controllers/chapterController");

const genreRouter = require("../routes/genre");
const categoryRouter = require("../routes/category");
const ratingRouter = require("../routes/rating");

const adminUserRouter = require("../routes/adminUser");
const adminStoryRouter = require("../routes/adminStory");
const adminChapterRouter = require("../routes/adminChapter");

router.get("/", adminController.checkSession);
router.post("/", adminController.login);

router.get("/home", authAdmin, adminController.home);
router.get("/logout", authAdmin, adminController.logout);

router.get("/genres", authAdmin, genreController.index);
router.get("/categories", authAdmin, categoryController.index);
router.get("/ratings", authAdmin, ratingController.index);

router.get("/users", authAdmin, userController.index);
router.get("/stories", authAdmin, storyController.index);
router.get("/chapters", authAdmin, chapterController.index);

router.use("/user", adminUserRouter);
router.use("/story", adminStoryRouter);
router.use("/chapter", adminChapterRouter);

router.use("/genre", genreRouter);
router.use("/category", categoryRouter);
router.use("/rating", ratingRouter);

module.exports = router;
