const TABLES = {
  books: "books",
  pets: "pets",
};

const select_table = (table_name) => {
  const tabel_exists = TABLES[table_name];

  if (tabel_exists) {
    return `SELECT * FROM ${table_name}`;
  }

  throw new Error("No such table exists");
};

module.exports = select_table;
