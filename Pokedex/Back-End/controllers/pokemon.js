const knex = require("../config/knexfile");
const formidable = require("formidable");
const fs = require("fs");

exports.list = async (req, res) => {
  await knex("pokemons")
    .then((pokemons) => {
      res.json(pokemons);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.addPokemon = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "La imagen no pudo ser cargada",
      });
    }
    const { name } = fields;
    if (!name || !name.length) {
      return res
        .status(400)
        .json({ error: "Este campo es obligatorio, nombre" });
    }

    let file_data;
    let file_type;
    if (files.file) {
      if (files.file.size > 1000000) {
        return res.status(400).json({
          error: "Tamaño máximo de la imagen: 1MB",
        });
      }

      file_data = fs.readFileSync(files.file.filepath);
      file_type = files.file.mimetype;
    }

    knex("pokemons")
      .insert({
        name: name,
        file_data: file_data,
        file_type: file_type,
      })
      .then(() => {
        res.json({
          success: true,
          mensaje: "El pokemon fue ingresado correctamente",
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
};

exports.photo = (req, res) => {
  const id = req.params.id;
  knex("pokemons")
    .where("id", id)
    .then((result) => {
      res.set("Content-Type", result[0].file_type);
      return res.send(result[0].file_data);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
