const db = require("../../db/index.js");
const getAllBooks = async () => {
  const books = await db.query("SELECT * FROM books");
  return books.rows;
};
const postBookById = async ( request_body) => {
  const { title, type, author, topic, publication_date, pages } = request_body;

  // RETURNING keyword is for INSERT, UPDATE and DELETE queries to show us what row of data has been created/updated/deleted
  const newBook = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  )
  return newBook.rows[0]
};
const getABookById = async(id) => {
    
    const book = await db.query("SELECT * FROM books WHERE id = $1", [id])
    

    return book.rows;
}
module.exports = { getAllBooks, postBookById , getABookById};
