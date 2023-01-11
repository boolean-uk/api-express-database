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

const updateBookByID = async (id, values) => {
	const result = await db.query(
		`UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *`,
		[...values, id]
	);
	return result.rows[0];
};

const createBook = async (values) => {
	console.log(values);
	const result = await db.query(
		'INSERT INTO books(title, type, author,topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
		values
	);
	return result.rows[0];
};

module.exports = {
	getAllBooks,
	getAllBooksByTypeOrTopic,
	getBookByID,
	createBook,
	updateBookByID,
};
