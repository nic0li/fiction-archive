const { check, validationResult, body } = require("express-validator");

const validacaoChapter = [

  check("title"),
  check("initialNotes"),
  check("finalNotes"),
  check("content"),

];

module.exports = validacaoChapter;