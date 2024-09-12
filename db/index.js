// Load our .env file
require("dotenv").config();

// Require Client obj from the postgres node module
const { Client } = require("pg");

const client = {
  /**
   * @param {Object} query
   * @param {String} query.text
   * @param {any[]} query.values
   * @return {Promise<import('pg').QueryResult>}
   */
  query: async (query) => {
    // Get the connection string from process.env -
    // the dotenv library sets this variable based
    // on the contents of our env file
    // Create a new connection to the database using the Client
    // object provided by the postgres node module
    const dbClient = new Client(process.env.PGURL);
    // connect a connection
    await dbClient.connect();
    // execute the query
    const result = await dbClient.query(query);
    // close the connection
    await dbClient.end();
    return result;
  },
};

module.exports = client;
