const db = require("../../db");
const { queryBuilder, extractPagination } = require("../../src/utils/utils");

const getAllBooks = async (queryParams) => {
  const paginationObject = extractPagination(queryParams);
  const sqlQuery = queryBuilder(
    "SELECT * FROM books",
    Object.keys(queryParams),
    paginationObject
  );
  const filteredQueryParams = Object.values(queryParams).map((item) =>
    item.toLowerCase().replace("%", " ")
  );
  const queryValues = [
    ...filteredQueryParams,
    paginationObject.per_page,
    paginationObject.page,
  ];
  try {
    const result = await db.query(sqlQuery, queryValues);
    return {
      books: result.rows,
      per_page: paginationObject.per_page,
      page: paginationObject.page,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

const getBookById = async (bookId) => {
  const sqlQuery = `select * from books where id = $1`;
  try {
    const result = await db.query(sqlQuery, [bookId]);
    if (result.rows.length === 0) {
      throw new Error("ID_NOT_FOUND");
    }
    return result.rows[0];
  } catch (error) {
    console.error(error);
    if (error.message === "ID_NOT_FOUND") {
      throw new Error("ERROR - A book with the provided does not exist");
    } else {
      throw new Error("Database Error");
    }
  }
};

const addBook = async (book) => {
  const sqlQuery = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const params = [
    book.title,
    book.type,
    book.author,
    book.topic,
    book.publicationDate,
    book.pages,
  ];

  try {
    const result = await db.query(sqlQuery, params);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

const updateBook = async (bookId, book) => {
  const sqlQuery = `UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *`;

  const params = [
    book.title,
    book.type,
    book.author,
    book.topic,
    book.publicationDate,
    book.pages,
    bookId,
  ];

  try {
    const result = await db.query(sqlQuery, params);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

const deleteBook = async (bookId) => {
  const sqlQuery = `DELETE FROM books WHERE id = $1 RETURNING *`;
  try {
    const result = await db.query(sqlQuery, [bookId]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
