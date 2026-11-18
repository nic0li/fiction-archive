
const { Story, Rating, Chapter, User } = require("../models");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const storyController = {

  index: async (req, res) => {
    const stories = await Story.findAll();

    return res.render("story/index", {
      title: "Stories",
      stories,
    });
  },

  findStoriesByUser: async (req, res) => {
    const user = await User.findByPk(req.session.authUser.id);

    const stories = await user.getStories();

    return res.render("story/list", {
      title: "Stories",
      stories,
    });
  },

  create: async (req, res) => {
    const ratings = await Rating.findAll();

    return res.render("story/new", {
      title: "New story",
      ratings,
    });
  },

  store: async (req, res) => {
    const {
      title,
      synopsis,
      ratingId,
      isCompleted,
    } = req.body;

    const directory = `${Date.now()}`;

    const story = await Story.create({
      directory,
      title,
      synopsis,
      ratingId,
      isCompleted: isCompleted ? 1 : 0,
    });

    const user = await User.findByPk(req.session.authUser.id);

    await user.addStory(story);

    await fs.promises.mkdir(
      path.join("uploads", "stories", directory),
      { recursive: true }
    );

    return res.redirect("/mystories");
  },

  edit: async (req, res) => {
    const userId = req.session.authUser.id;
    const { directory } = req.params;

    const story = await Story.findOne({
      where: { directory },
      include: [
        {
          model: User,
          where: { id: userId },
        },
        {
          model: Rating,
        },
      ],
    });

    if (!story) {
      return res.redirect("/mystories");
    }

    const ratings = await Rating.findAll();

    return res.render("story/edit", {
      title: "Edit story",
      story,
      ratings,
    });
  },

  update: async (req, res) => {
    const userId = req.session.authUser.id;
    const { directory } = req.params;

    const story = await Story.findOne({
      where: { directory },
      include: {
        model: User,
        where: { id: userId },
      },
    });

    if (!story) {
      return res.redirect("/mystories");
    }

    const {
      title,
      synopsis,
      ratingId,
      isCompleted,
    } = req.body;

    await story.update({
      title,
      synopsis,
      ratingId,
      isCompleted: isCompleted ? 1 : 0,
    });

    return res.redirect("/mystories");
  },

  destroy: async (req, res) => {
    const { directory } = req.params;

    const isAdmin = !!req.session.authAdmin;
    const isUser = !!req.session.authUser;

    if (!isAdmin && !isUser) {
      return res.redirect("/");
    }

    let story;

    if (isAdmin) {
      story = await Story.findOne({
        where: { directory },
      });
    } else {
      story = await Story.findOne({
        where: { directory },
        include: {
          model: User,
          where: { id: req.session.authUser.id },
        },
      });
    }

    if (!story) {
      return res.redirect(isAdmin ? "/admin/stories" : "/mystories");
    }

    await Chapter.destroy({
      where: { storyId: story.id },
    });

    // Remove os relacionamentos da tabela user_stories
    await story.setUsers([]);

    await story.destroy();

    return res.redirect(isAdmin ? "/admin/stories" : "/mystories");
  },

  findByDirectory: async (req, res) => {
    const { directory } = req.params;

    const story = await Story.findOne({
      where: { directory },
      include: {
        model: Rating,
      },
    });

    if (!story) {
      return res.redirect("/");
    }

    const [user] = await story.getUsers();

    const chapters = await Chapter.findAll({
      where: { storyId: story.id },
    });

    return res.render("story/view", {
      title: `Story: ${story.title}`,
      story,
      user,
      chapters,
      moment,
    });
  },

};

module.exports = storyController;
