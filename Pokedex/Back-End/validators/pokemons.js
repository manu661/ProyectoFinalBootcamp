const { check } = require("express-validator");

exports.pokemonsValidator = [
  check("name")
    .not()
    .isEmpty()
    .isString()
    .withMessage("Se ha ingresado un nombre inválido"),
];
