const { response } = require("express");
const client = require("../../db/index");

const getAllBooks = async () => {
  try {
    const response = await client.query("SELECT * FROM books");
    return response.rows;
  } catch (error) {
    console.log("Error:", error);
  }
};

const createBook = async (book) => {
  try {
    const sqlQuery = `insert into books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *`;
    const response = await client.query(sqlQuery, [
      book.title,
      book.type,
      book.author,
      book.topic,
      book.publication_date,
      book.pages,
    ]);
    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

const getBookById = async (id) => {
  try {
    const response = await client.query(`SELECT * FROM books WHERE id = ${id}`);
    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

const updateBook = async (id, bookInfo) => {
  try {
    const response = await client.query(`UPDATE books
      SET title = '${bookInfo.title}', type = '${bookInfo.type}', author = '${bookInfo.author}', topic = '${bookInfo.topic}', publication_date = '${bookInfo.publication_date}', pages = '${bookInfo.pages}'
      WHERE id = ${id} RETURNING *`);

    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

const deleteBook = async (id) => {
    try {
      const sqlQuery = `delete from books where id = $1 returning *`;
      const response = await client.query(sqlQuery, [id]);

      return response.rows[0];
    } catch (error) {
      console.log("Error:", error);
    }
}
module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
};
