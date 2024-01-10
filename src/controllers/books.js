const db = require("../../db");

 let select_query = "SELECT * FROM books";
let books;

const getAllBooks = async () => {
    books = await db.query(select_query);
    return books.rows;
};

module.exports = {
    getAllBooks
}
