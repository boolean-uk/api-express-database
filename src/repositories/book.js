const { as } = require("pg-promise");
const db = require("../../db");

const getAllBooks = async (author, page = 1, per_page = 10) => {
  page = page * per_page - per_page;

  if (author) {
    // If AUTHOR is given:
    const result = await db.query(
      `SELECT * FROM books WHERE author = $1 LIMIT $2 OFFSET $3`,
      [author, per_page, page]
    );
    return result.rows;
  } else {
    // If NOT AUTHOR given:
    const result = await db.query(`SELECT * FROM books LIMIT $1 OFFSET $2`, [
      per_page,
      page,
    ]);
    return result.rows;
  }
};

const getBookById = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows;
};

const getBookByTitle = async (title) => {
  const result = await db.query("SELECT * FROM books WHERE title = $1", [
    title,
  ]);
  return result.rows;
};

const createBook = async (values) => {
  const result = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values
  );

  return result.rows[0];
};

const updateBook = async (id, values) => {
  const result = await db.query(
    'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" =$6, pages=$7 WHERE id = $1 RETURNING *',
    [id, ...values]
  );

  return result.rows[0];
};

const deleteBookById = async (id) => {
  const result = await db.query(
    `DELETE FROM books WHERE id = ${id}
  RETURNING *`
  );
  return result.rows[0];
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBookById,
  getBookByTitle,
};
