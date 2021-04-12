const Pool = require("pg").Pool;

//This uses Postgres Database
// Once you configure the database, rename this file to db.js
// after finishing with this file, go into dbModel.sql and run those queries using postgres or using pgAdmin query tools
const pool = new Pool({
  user: "",
  password: "",
  database: "",
  host: "",
  port: 5432,
});

module.exports = pool;
