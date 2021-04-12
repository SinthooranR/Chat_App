const Pool = require("pg").Pool;
require("dotenv").config();

// set a configuartion to connect our database
// pgdb is from the docker-compose service for database
const poolDevelopment = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
};

// uses the Heroku Postgres Addon
const poolProduction = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

module.exports = new Pool(
  process.env.NODE_ENV === "production" ? poolProduction : poolDevelopment
);
