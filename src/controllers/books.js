const db = require("../../db/index.js");
const getAllBooks = async() => {
    const books = await db.query('SELECT * FROM books');
    return books.rows

}
module.exports = {getAllBooks}