
const { Chapter, Story, User } = require("../models");
const moment = require("moment");

const chapterController = {

  index: async (req, res) => {
    const { directory } = req.params;

    const story = await Story.findOne({
      where: { directory },
    });

    if (!story) {
      return res.redirect("/");
    }

    const chapters = await Chapter.findAll({
      where: { storyId: story.id },
    });

    return res.render("chapter/index", {
      title: "Chapters",
      story,
      chapters,
    });
  },

  findChaptersByStory: async (req, res) => {
    const { directory } = req.params;

    const story = await Story.findOne({
      where: { directory },
    });

    if (!story) {
      return res.redirect("/");
    }

    const chapters = await Chapter.findAll({
      where: { storyId: story.id },
    });

    return res.render("chapter/list", {
      title: "Chapters",
      story,
      chapters,
    });
  },

  create: async (req, res) => {
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

    return res.render("chapter/new", {
      title: "New chapter",
      story,
    });
  },

  store: async (req, res) => {
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
      content,
      initialNotes,
      finalNotes,
    } = req.body;

    await Chapter.create({
      title,
      content,
      initialNotes,
      finalNotes,
      storyId: story.id,
    });

    return res.redirect(`/mystories/${directory}/chapters`);
  },

  edit: async (req, res) => {
    const userId = req.session.authUser.id;
    const { directory, chapterId } = req.params;

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

    const chapter = await Chapter.findOne({
      where: {
        id: chapterId,
        storyId: story.id,
      },
    });

    if (!chapter) {
      return res.redirect(`/mystories/${directory}/chapters`);
    }

    return res.render("chapter/edit", {
      title: "Edit chapter",
      story,
      chapter,
    });
  },

  update: async (req, res) => {
    const userId = req.session.authUser.id;
    const { directory, chapterId } = req.params;

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

    const chapter = await Chapter.findOne({
      where: {
        id: chapterId,
        storyId: story.id,
      },
    });

    if (!chapter) {
      return res.redirect(`/mystories/${directory}/chapters`);
    }

    const {
      title,
      content,
      initialNotes,
      finalNotes,
    } = req.body;

    await chapter.update({
      title,
      content,
      initialNotes,
      finalNotes,
    });

    return res.redirect(`/mystories/${directory}/chapters`);
  },

  destroy: async (req, res) => {
    const { directory, chapterId } = req.params;

    const isAdmin = !!req.session.authAdmin;
    const isUser = !!req.session.authUser;

    if (!isAdmin && !isUser) {
      return res.redirect("/");
    }

    const story = await Story.findOne({
      where: { directory },
    });

    if (!story) {
      return res.redirect("/");
    }

    if (isUser && !isAdmin) {
      const userStory = await Story.findOne({
        where: { directory },
        include: {
          model: User,
          where: { id: req.session.authUser.id },
        },
      });

      if (!userStory) {
        return res.redirect("/mystories");
      }
    }

    const chapter = await Chapter.findOne({
      where: {
        id: chapterId,
        storyId: story.id,
      },
    });

    if (!chapter) {
      return res.redirect(
        isAdmin
          ? `/admin/story/${directory}/chapters`
          : `/mystories/${directory}/chapters`
      );
    }

    await chapter.destroy();

    return res.redirect(
      isAdmin
        ? `/admin/story/${directory}/chapters`
        : `/mystories/${directory}/chapters`
    );
  },

  findById: async (req, res) => {
    const { directory, chapterId } = req.params;

    const story = await Story.findOne({
      where: { directory },
    });

    if (!story) {
      return res.redirect("/");
    }

    const chapter = await Chapter.findOne({
      where: {
        id: chapterId,
        storyId: story.id,
      },
    });

    if (!chapter) {
      return res.redirect("/");
    }

    return res.render("chapter/view", {
      title: `Story: ${story.title} - ${chapter.title}`,
      chapter,
      story,
      moment,
    });
  },

};

module.exports = chapterController;
