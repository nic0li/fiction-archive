const { Category } = require("../models");

const categoryController = {

  index: async (req, res) => {
    const categories = await Category.findAll();
    return res.render("admin/category/index", {
      title: "Categories", categories
    });
  },

  new: (req, res) => {
    return res.render("admin/category/new", {
      title: "Add Category"
    });
  },

  store: async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    return res.redirect("/admin/categories");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.redirect("/admin/categories");
    }
    return res.render("admin/category/edit", {
      title: "Edit category", category
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.redirect("/admin/categories");
    }
    await category.update({ name });
    return res.redirect("/admin/categories");
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.redirect("/admin/categories");
    }
    await category.destroy();
    return res.redirect("/admin/categories");
  },

};

module.exports = categoryController;
