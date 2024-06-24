const db = require("../../db/index.js");

async function fetchAllBooks() {
  try {
    const result = await db.query("SELECT * FROM books");
    return result.rows;
  } catch (e) {
    console.log(e);
  }
}

async function fetchBookByQuery(query) {
  let sqlQuery = "SELECT * FROM books";
  const params = [];
  const perPage = query.perPage || 20;

  if (query.author) {
    params.push(query.author);
    sqlQuery += ` WHERE author = $${params.length}`;
  }

  params.push(perPage);
  sqlQuery += ` LIMIT $${params.length}`;

  if (query.page) {
    params.push((query.page - 1) * query.perPage);
    sqlQuery += ` OFFSET $${params.length}`;
  }

  try {
    const result = await db.query(sqlQuery, params);
    return result.rows;
  } catch (e) {
    console.log(e);
  }
}

async function postBook(book) {
  try {
    const sqlQuery = `INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const result = await db.query(sqlQuery, [
      book.title,
      book.type,
      book.author,
      book.topic,
      book.publication_date,
      book.pages,
    ]);
    return result.rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function fetchBookById(id) {
  try {
    const sqlQuery = "SELECT * FROM books WHERE id = $1;";
    const result = await db.query(sqlQuery, [id]);
    return result.rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updateBookById(id, newParams) {
    console.log(id, newParams)
  try {
    const sqlQuery =
      "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *;";
    const result = await db.query(sqlQuery, [
      id,
      newParams.title,
      newParams.type,
      newParams.author,
      newParams.topic,
      newParams.publication_date,
      newParams.pages,
    ]);
    return result.rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function deleteBookById(id) {
  try {
    const sqlQuery = "DELETE FROM books WHERE id = $1 RETURNING *;";
    const result = await db.query(sqlQuery, [id]);
    return result.rows[0];
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  fetchAllBooks,
  postBook,
  fetchBookById,
  updateBookById,
  deleteBookById,
  fetchBookByQuery,
};
