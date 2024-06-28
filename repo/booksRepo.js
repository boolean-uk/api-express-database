const dbConnection = require("../db/dbConnection.js");

async function getAllBooks(req) {
  const db = await dbConnection.connect();
  try {
    const sqlQuery = "SELECT * FROM books";
    const result = await db.query(sqlQuery);
    return result;
  } finally {
    db.release();
  }
}

async function createNewBook(req) {
  const db = await dbConnection.connect();
  const bookData = require("../test/fixtures/bookData.js");

  const { title, type, author, topic, publication_date, pages } =
    bookData.book1;

  try {
    const sqlQuery = `
      INSERT INTO books (title, type, author, topic, publication_date, pages)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [title, type, author, topic, publication_date, pages];
    const result = await db.query(sqlQuery, values);
    return result;
  } finally {
    db.release();
  }
}

async function listBook(req) {
  const db = await dbConnection.connect();
  const { id } = req.params;

  try {
    const sqlQuery = `SELECT * FROM books WHERE id = $1;`;
    const result = await db.query(sqlQuery, [id]);
    return result;
  } finally {
    db.release();
  }
}

const updateBook = async (id, bookData) => {
  const db = await dbConnection.connect();
  const { title, type, author, topic, publication_date, pages } = bookData;

  try {
    const sqlQuery = `
      UPDATE books
      SET title = $1,
          type = $2,
          author = $3,
          topic = $4,
          publication_date = $5,
          pages = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [title, type, author, topic, publication_date, pages, id];
    const result = await db.query(sqlQuery, values);
    return result.rows[0];
  } finally {
    db.release();
  }
};

const deleteBook = async (id) => {
  const db = await dbConnection.connect();

  try {
    const sqlQuery = `DELETE FROM books WHERE id = $1 RETURNING *;`;
    const result = await db.query(sqlQuery, [id]);
    return result.rows[0];
  } finally {
    db.release();
  }
};

module.exports = { deleteBook };

module.exports = {
  getAllBooks,
  createNewBook,
  listBook,
  updateBook,
  deleteBook,
};
