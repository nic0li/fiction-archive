const { check, validationResult, body } = require("express-validator");

const validacaoStory = [

  check("title"),
  check("cover"),
  check("synopsis"),
  check("rating"),
  check("isCompleted"),

];

module.exports = validacaoStory;