const db = require("../../db");

// Function to get all books
const fetchAllBooks = async (queryParams) => {
  let selectQuery = "SELECT * FROM books";
  let books;

  if (queryParams.id) {
    selectQuery += " WHERE id = $1";
    books = await db.query(selectQuery, [queryParams.id]);
  } else {
    books = await db.query(selectQuery);
  }

  return books.rows;
};

module.exports = {
  fetchAllBooks,
};
