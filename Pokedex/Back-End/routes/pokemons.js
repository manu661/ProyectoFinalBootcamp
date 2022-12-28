const express = require("express");
const router = express.Router();

const { list, addPokemon, photo } = require("../controllers/pokemon");
const { pokemonsValidator } = require("../validators/pokemons");
const { runValidation } = require("../validators");

router.get("/pokemons", list);
router.post("/pokemons/nuevo", addPokemon);
router.get("/pokemons/photo/:id", photo);
// router.post("/pokemons/nuevo", pokemonsValidator, runValidation, addPokemon);

module.exports = router;
