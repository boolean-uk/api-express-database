const db = require("../../db");

let select_query = "SELECT * FROM books";
let books;
const sqlBookKeys = "title, type, author, topic, publication_date, pages";

const getBooks = async (req_params) => {
    if (!req_params) {
        books = await db.query(select_query);
        return books.rows;
    }

    if (req_params) {
        const { id } = req_params;
        const foundBook = await db.query("SELECT * FROM books WHERE id = $1", [
            id,
        ]);
        return foundBook.rows[0];
    }
};

const createBook = async (req_body) => {
    const { title, type, author, topic, publication_date, pages } = req_body;

    const newBook = await db.query(
        `INSERT INTO books (${sqlBookKeys}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, type, author, topic, publication_date, pages]
    );
    return newBook.rows[0];
};

const updateBookById = async (req_params, req_body) => {
    const { id } = req_params;
    const { title, type, author, topic, publication_date, pages } = req_body;

    const updateBook = await db.query(
        "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
        [id, title, type, author, topic, publication_date, pages]
    );

    return updateBook.rows[0]
}

module.exports = {
    getBooks,
    createBook,
    updateBookById
};
