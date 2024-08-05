// Load our .env file
require("dotenv").config();

// Require Client obj from the postgres node module
const { Client } = require("pg");

const client = {
  query: async (str, values) => {
    // Get the connection string from process.env -
    // the dotenv library sets this variable based
    // on the contents of our env file
    // Create a new connection to the database using the Client
    // object provided by the postgres node module
    const dbClient = new Client(process.env.PGURL);
    // connect a connection
    await dbClient.connect();
    // execute the query
    const result = await dbClient.query(str, values);
    // close the connection
    await dbClient.end();
    return result;
  },
};

module.exports = client;
