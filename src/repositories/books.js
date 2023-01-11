const db = require("../../db");

const getAllBooks = async (req, res) => {
	return db.query(`SELECT * FROM books`);
};

const getAllBooksByTypeOrTopic = async (type, topic) => {
	let filters = "";

	if (type && topic) {
		filters = `WHERE type = $1 AND topic = $2`;

		return db.query(`SELECT * FROM books ${filters}`, [type, topic]);
	} else if (type) {
		filters = `WHERE type = $1`;
		return db.query(`SELECT * FROM books ${filters}`, [type]);
	} else if (topic) {
		filters = `WHERE topic = $1`;
		return db.query(`SELECT * FROM books ${filters}`, [topic]);
	}
};

const getBookByID = async (id) => {
	return db.query(`SELECT * FROM books WHERE id = $1`, [id]);
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

const deleteBookByID = async (id) => {
	const result = await db.query(
		"DELETE from books WHERE id = $1  RETURNING *",
		[id]
	);
	return result.rows;
};

module.exports = {
	getAllBooks,
	getAllBooksByTypeOrTopic,
	getBookByID,
	createBook,
	updateBookByID,
	deleteBookByID,
};
