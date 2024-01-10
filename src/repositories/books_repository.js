const db = require("../../db");

let selectAllBooks = "SELECT * FROM books";

const getAllBooks = async (title, author) => {
  try {
    const params = [];

    if (title && author) {
      selectAllBooks += " Where title = $1 AND author = $2";
      params.push(title, author);
    }
    if (title && !author) {
      selectAllBooks += " WHERE title = $1";
      params.push(title);
    }

    if (!title && author) {
      selectAllBooks += " WHERE author = $1";
      params.push(author);
    }
    const result = await db.query(selectAllBooks, params);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database error occured");
  }
};

const getBookById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Database error occured");
  }
};

const createBook = async (
  title,
  type,
  author,
  topic,
  publication_date,
  pages
) => {
  try {
    // const existingBook = await db.query(
    //   "SELECT * FROM books WHERE title = $1",
    //   [title]
    // );

    // if (existingBook.rows.length > 0) {
    //   if (existingBook.rows[0].title === title) {
    //     res
    //       .status(409)
    //       .json({ error: "A book with the provided title already exists" });
    //   }
    // }
    const result = await db.query(
      "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, type, author, topic, publication_date, pages]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Database error occured");
  }
};

const updateBook = async (
  id,
  title,
  type,
  author,
  topic,
  publication_date,
  pages
) => {
  try {
    const result = await db.query(
      "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
      [id, title, type, author, topic, publication_date, pages]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occured");
  }
};

const deleteBook = async (id) => {
    try {
        const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id])
        return result.rows[0]
    }catch (error) {
        throw new Error("Database error occured");
    }
}


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
