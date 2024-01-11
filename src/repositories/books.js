const db = require("../../db");

const getAllBooks = async (author = "", page = 1, perPage = 20) => {
  let result;
  let limit;
  let offset;
  if (parseInt(perPage)) {
    limit = perPage;
  }
  if (parseInt(page)) {
    offset = (page - 1) * perPage;
  }

  if (author.length !== 0) {
    result = await db.query(
      "SELECT * FROM books WHERE author = $1 LIMIT $2 OFFSET $3",
      [author, limit, offset]
    );

    result = { books: result.rows, page: page, perPage: perPage };
    return result;
  }
  result = await db.query("SELECT * FROM books LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);
  result = { books: result.rows, page: parseInt(page), per_page: parseInt(perPage) };
  return result;
};
const getBookBy = async (request_param) => {
  const key = Object.keys(request_param)[0];
  const value = Object.values(request_param)[0];
  const base_query_string = "SELECT * FROM books WHERE ";
  let query_string;
  if (key === "id") {
    query_string = base_query_string.concat("id = $1");
  }
  if (key === "title") {
    query_string = base_query_string.concat("title = $1");
  }
  const result = await db.query(query_string, [value]);
  return result;
};
const deleteBook = async (id) => {
  await db.query("DELETE FROM books WHERE id = $1", [id]);
};
const addBook = async (book) => {
  const properties = Object.keys(book);
  const values = Object.values(book);
  const query_string =
    "INSERT INTO books ".concat(`(${properties.map((p) => " ".concat(p))})`) +
    " VALUES ( $1, $2, $3, $4, $5, $6)";
  await db.query(
    query_string,
    values.map((value) => value)
  );
};
const editBook = async (request_param, request_body) => {
  const { id } = request_param;
  const properties = Object.keys(request_body);
  const values = Object.values(request_body);
  values.push(id);
  const base_query_string = "UPDATE books SET ";
  const query_string_updates = properties.map((property, index) =>
    property.concat(` = $${index + 1} `)
  );
  const query_string_where = " WHERE id = $7";
  const full_query_string =
    base_query_string + query_string_updates + query_string_where;
  await db.query(
    full_query_string,
    values.map((value) => value)
  );
};

module.exports = {
  getAllBooks,
  getBookBy,
  deleteBook,
  addBook,
  editBook,
};
