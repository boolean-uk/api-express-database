const { Client } = require("pg");
require('dotenv').config();

const { HOST, PORT, DATABASE, USERNAME, PASSWORD, DATABASE_URL } = process.env;

//const db = new Pool({
  //host: PGHOST,
  //database: PGDATABASE,
  //username: PGUSER,
  //password: PGPASSWORD,
//});

const db = new Client(DATABASE_URL);

const init = async () => {
  await db.connect();
};
init()




module.exports = db;
