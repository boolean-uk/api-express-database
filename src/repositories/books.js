const db = require("../../db");

const getAllBooks = async (request_query) => {
  let result;
  const keys = Object.keys(request_query)
  const values = Object.values(request_query)
  if (keys.length === 1 && keys[0] === 'author') {
    result = await db.query("SELECT * FROM books WHERE author = $1", [values[0]]);
  }
  if (keys[0] === "page" && keys[1] === "perPage") {
    let limit
    if(!values[0]) {
      limit = 20
    }
    if(values[0]) {
      limit = values[1]
    }
    const offset = (values[0] - 1) * values[1]
    result = await db.query("SELECT * FROM books LIMIT $1 OFFSET $2", [limit, offset]);
  }
  if (keys.length === 0) {
    result = await db.query("SELECT * FROM books");
  }
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
const deleteBook = async (request_param) => {
  const itemToDelete = await getBookBy(request_param);
  const { id } = request_param;
  await db.query("DELETE FROM books WHERE id = $1", [id]);
  return itemToDelete;
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
