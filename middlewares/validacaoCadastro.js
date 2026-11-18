const { User } = require("../models");
const { check, validationResult, body } = require("express-validator");

const validacaoUser = [
  check("username").isLength({ min: 3 }).withMessage("O username é muito curto"),
  check("email").isEmail().withMessage("O email não é válido"),
  check("password").isLength({ min: 3 }).withMessage("A password é muito curta"),

  body("username").custom(async username => {
    const user = await User.findAll({
      where: { username },
    });
    let array = [];
    user.forEach(user => {
      array.push(user.username);
    });
    if (array.includes(username)) {
      return Promise.reject("O username já está cadastrado no sistema");
    }

  }),

  body("email").custom(async email => {
    const user = await User.findAll({
      where: { email },
    });
    let array = [];
    user.forEach(user => {
      array.push(user.email);
    });
    if (array.includes(email)) {
      return Promise.reject("O email já está cadastrado no sistema");
    }

  }),

];

module.exports = validacaoUser;