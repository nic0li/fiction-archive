
const authService = require("../services/authService");

const authController = {

  index: (req, res) => {
    if (req.session.authUser) {
      return res.redirect("/home");
    }
    if (req.session.authAdmin) {
      return res.redirect("/admin/home");
    }
    return res.redirect("/login");
  },

  home: (req, res) => {
    return res.render("home", { title: "Home" });
  },

  checkSession: (req, res) => {
    if (req.session.authUser) {
      return res.redirect("/home");
    }
    if (req.session.authAdmin) {
      return res.redirect("/admin/home");
    }
    return res.render("login", { title: "Login" });
  },

  login: async (req, res) => {
    const { login, password } = req.body;
    const result = await authService.loginUser(login, password);
    if (!result.success) {
      return res.render("login", {
        title: "Login",
        erroLogin: result.message,
      });
    }
    const { user } = result;
    req.session.authUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return res.redirect("/home");
  },

  logout: (req, res) => {
    req.session.authUser = undefined;
    return res.redirect("/");
  },

};

module.exports = authController;
