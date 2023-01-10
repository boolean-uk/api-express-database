const id = require("faker/lib/locales/id_ID");
const db = require("../../db");
const getAllBooks = async (req, res) => {
  return db.query(`SELECT * FROM books`);
};
const getAllBooksByTypeOrTopic = async (type, topic) => {
  let filters = "";

  if (type && topic) {
    filters = `WHERE type = '${type}' AND topic = '${topic}'`;

    return db.query(`SELECT * FROM books ${filters}`);
  } else if (type) {
    filters = `WHERE type = '${type}'`;
    return db.query(`SELECT * FROM books ${filters}`);
  } else if (topic) {
    filters = `WHERE topic = '${topic}'`;
    return db.query(`SELECT * FROM books ${filters}`);
  }
};
const getBookByID = async (id) => {
  return db.query(`SELECT * FROM books WHERE id = ${id}`);
};
const createBook = async (values) => {
  const data = [...values];
  return db.query(
    `INSERT INTO books(title, type, author,topic, "publicationDate", pages) VALUES ('${data}')`
  );
};
module.exports = {
  getAllBooks,
  getAllBooksByTypeOrTopic,
  getBookByID,
  createBook,
};
