const { Rating } = require("../models");

const ratingController = {

  index: async (req, res) => {
    const ratings = await Rating.findAll();
    return res.render("admin/rating/index", {
      title: "Ratings", ratings
    });
  },

  new: (req, res) => {
    return res.render("admin/rating/new", {
      title: "Add Rating"
    });
  },

  store: async (req, res) => {
    const { name } = req.body;
    await Rating.create({ name });
    return res.redirect("/admin/ratings");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.redirect("/admin/categories");
    }
    return res.render("admin/rating/edit", {
      title: "Edit rating", rating
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.redirect("/admin/ratings");
    }
    await rating.update({ name });
    return res.redirect("/admin/ratings");
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.redirect("/admin/ratings");
    }
    await rating.destroy();
    return res.redirect("/admin/ratings");
  },

};

module.exports = ratingController;
