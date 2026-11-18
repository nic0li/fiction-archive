const { Genre } = require("../models");

const genreController = {

  index: async (req, res) => {
    const genres = await Genre.findAll();
    return res.render("admin/genre/index", {
      title: "Genres", genres
    });
  },

  new: (req, res) => {
    return res.render("admin/genre/new", {
      title: "Add Genre"
    });
  },

  store: async (req, res) => {
    const { name } = req.body;
    await Genre.create({ name });
    return res.redirect("/admin/genres");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.redirect("/admin/categories");
    }
    return res.render("admin/genre/edit", {
      title: "Edit genre", genre
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.redirect("/admin/genres");
    }
    await genre.update({ name });
    return res.redirect("/admin/genres");
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.redirect("/admin/genres");
    }
    await genre.destroy();
    return res.redirect("/admin/genres");
  },

};

module.exports = genreController;
