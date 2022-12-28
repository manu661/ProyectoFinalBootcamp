const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "m5546792",
    database: "Pokedex",
  },
});

module.exports = knex;
