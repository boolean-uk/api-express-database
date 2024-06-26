const db = require("./db.js");


const all = async () => {
  const result = await db.query("SELECT * FROM books");
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

const create = async (book) => {
  const result = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      book.title,
      book.type,
      book.author,
      book.topic,
      book.publication_date,
      book.pages,
    ]
  );
  return result.rows[0];
};

const update = async (id, updates) => {
  const result = await db.query(
    "UPDATE books SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7 RETURNING *",
    [
      updates.name,
      updates.type,
      updates.author,
      updates.topic,
      updates.publication_date,
      updates.pages,
      id,
    ]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  all,
  getById,
  create,
  update,
  remove,
};
