
const authService = require("../services/authService");

const adminController = {

  home: (req, res) => {
    return res.render("homeAdmin", { title: "Home Admin" });
  },

  checkSession: (req, res) => {
    if (req.session.authAdmin) {
      return res.redirect("/admin/home");
    }
    if (req.session.authUser) {
      return res.redirect("/home");
    }
    return res.render("loginAdmin", { title: "Login Admin" });
  },

  login: async (req, res) => {
    const { login, password } = req.body;
    const result = await authService.loginAdmin(login, password);
    if (!result.success) {
      return res.render("loginAdmin", {
        title: "Login Admin",
        erroLogin: result.message,
      });
    }
    const { user } = result;
    req.session.authAdmin = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return res.redirect("/admin/home");
  },

  logout: (req, res) => {
    req.session.authAdmin = undefined;
    return res.redirect("/");
  },

};

module.exports = adminController;
