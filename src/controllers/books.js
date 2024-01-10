const db = require("../../db");

const getAllBooks = async () => {
  const result = await db.query("SELECT * FROM books");
  return result.rows;
};

module.exports = { getAllBooks };
