const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { validationResult } = require("express-validator");
const moment = require("moment");

const userController = {

  index: async (req, res) => {
    const users = await User.findAll();
    return res.render("user/index", { title: "Users", users });
  },

  create: (req, res) => {
    if (req.session.authUser) {
      return res.redirect("/home");

    } else if (req.session.authAdmin) {
      return res.redirect("/admin/home");

    } else {
      return res.render("userregister", { title: "Register" });

    }
  },

  store: async (req, res) => {
    console.log(validationResult(req));

    let errorList = validationResult(req);

    if (errorList.isEmpty()) {

      const { username, email, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });

      if (!user) {
        return res.render("userregister", { msg: "Falha ao cadastrar!" });
      };

      return res.redirect("/login");

    } else {

      return res.render("userregister", { title: "Register", errors: errorList.errors });

    }


  },

  edit: async (req, res) => {
    if (req.session.authUser) {

      const authUserSession = req.session.authUser.id;
      const user = await User.findOne({
        where: { id: authUserSession },
      });
      return res.render("user/edit", { title: "Settings", user });

    } else if (req.session.authAdmin) {

      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.render("user/edit", { title: "Edit user", user });

    }
  },

  update: async (req, res) => {
    if (req.session.authUser) {

      const authUserSession = req.session.authUser.id;
      const {
        username,
        email,
        name,
        description,
      } = req.body;

      await User.update({
        username,
        email,
        name,
        description,
        updatedAt: new Date(),
      }, {
        where: { id: authUserSession },
      });
      return res.redirect("/home");

    } else if (req.session.authAdmin) {

      const { id } = req.params;
      const {
        username,
        email,
        name,
        description,
      } = req.body;

      await User.update({
        username,
        email,
        name,
        description,
        updatedAt: new Date(),
      }, {
        where: { id },
      });
      return res.redirect("/admin/users");

    }
  },

  updatePassword: async (req, res) => {
    if (req.session.authUser) {

      try {
        const authUserSession = req.session.authUser.id;
        const { password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const passwordAlterada = await User.update({
          password: hashPassword,
          updatedAt: new Date(),
        }, {
          where: { id: authUserSession },
        });
        return res.status(202).json(passwordAlterada);
      } catch (error) {
        return res.status(400).json({
          error: true,
          msg: "Erro na requisição. Tente novamente!",
        });
      }

    } else if (req.session.authAdmin) {

      try {
        const { id } = req.params;
        const { password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const passwordAlterada = await User.update({
          password: hashPassword,
          updatedAt: new Date(),
        }, {
          where: { id },
        });
        return res.status(202).json(passwordAlterada);
      } catch (error) {
        return res.status(400).json({
          error: true,
          msg: "Erro na requisição. Tente novamente!",
        });
      }

    }

  },

  updateAvatar: async (req, res) => {
    if (req.session.authUser) {

      try {
        const authUserSession = req.session.authUser.id;
        const [avatar] = req.files;
        const avatarAlterado = await User.update({
          avatar: avatar.filename,
          updatedAt: new Date(),
        }, {
          where: { id: authUserSession },
        });
        return res.status(202).json(avatarAlterado);
      } catch (error) {
        return res.status(400).json({
          error: true,
          msg: "Erro na requisição. Tente novamente!",
        });
      }

    } else if (req.session.authAdmin) {

      try {
        const { id } = req.params;
        const [avatar] = req.files;
        const avatarAlterado = await User.update({
          avatar: avatar.filename,
          updatedAt: new Date(),
        }, {
          where: { id },
        });
        return res.status(202).json(avatarAlterado);
      } catch (error) {
        return res.status(400).json({
          error: true,
          msg: "Erro na requisição. Tente novamente!",
        });
      }

    }

  },

  destroy: async (req, res) => {
    if (req.session.authUser) {

      const authUserSession = req.session.authUser.id;
      await User.destroy({
        where: { id: authUserSession },
      });
      return res.redirect("/logout");

    } else if (req.session.authAdmin) {

      const { id } = req.params;
      await User.destroy({
        where: { id },
      });
      return res.redirect("/admin/users");

    }
  },

  findByUsername: async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
    });
    return res.render("user/view", { title: `Profile: ${user.username}`, user, moment });
  },

};

module.exports = userController;
