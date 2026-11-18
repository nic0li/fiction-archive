const { check, validationResult, body } = require("express-validator");

const validacaoUser = [

  check("username"),
  check("email"),
  check("password"),
  check("name"),
  check("avatar"),
  check("description"),

];

module.exports = validacaoUser;