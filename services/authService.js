
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { Op } = require("sequelize");

const authService = {

  authenticate: async (login, password) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: login },
          { username: login },
        ],
      },
    });
    if (!user) {
      return {
        success: false,
        message: "O user não existe no sistema!",
      };
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return {
        success: false,
        message: "Email ou password incorretos!",
      };
    }
    return { success: true, user };
  },

  loginUser: async (login, password) => {
    return await authService.authenticate(login, password);
  },

  loginAdmin: async (login, password) => {
    const result = await authService.authenticate(login, password);
    if (!result.success) {
      return result;
    }
    const permissions = await result.user.getPermissions();
    const isAdmin = permissions.some(permission =>
      ["Admin", "admin", "Administrador", "administrador"]
        .includes(permission.name)
    );
    if (!isAdmin) {
      return {
        success: false,
        message: "O user não possui acesso a esta área!",
      };
    }
    return {
      success: true,
      user: result.user,
    };
  },

};

module.exports = authService;
