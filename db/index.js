// import Pool from Postgres
const { Pool } = require("pg");

// import environment variables from .env file
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const dbConnection = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

module.exports = dbConnection;
