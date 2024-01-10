const db = require("../../db");

const getAllBooks = async () => {
    let select_query = "SELECT * FROM books";
    let books;

    books = await db.query(select_query);

    return books.rows;
};

module.exports = {
    getAllBooks
}
