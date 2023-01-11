const {
	getAllBooks,
	getAllBooksByTypeOrTopic,
	getBookByID,
	updateBookByID,
	createBook,
	deleteBookByID,
} = require("../repositories/books.js");

const getAll = async (req, res) => {
	const { topic, type, author, page, per_page } = req.query;
	if (topic || type || author || page || per_page) {
		const result = await getAllBooksByTypeOrTopic(
			type,
			topic,
			author,
			page,
			per_page
		);
		res.json({ books: result.rows });
	} else {
		const result = await getAllBooks();
		res.json({ books: result.rows });
	}
};

const getByID = async (req, res) => {
	const { id } = req.params;
	const result = await getBookByID(id);

	try {
		const book = await getBookByID(id);
		if (!book) {
			res.status(400).json({
				error: `no book with id: ${id}`,
			});
		} else {
			res.json({ book: result.rows[0] });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateByID = async (req, res) => {
	const { id } = req.params;
	const { title, type, author, topic, publicationDate, pages } = req.body;
	const date = new Date(publicationDate);
	const values = [title, type, author, topic, date, pages];

	try {
		const book = await updateBookByID(id, values);
		if (!book) {
			res.status(400).json({
				error:
					"Failed to update book with given id, due to either payload or id being incorrect",
				body: req.body,
			});
		} else {
			res.status(201).json({ book: book });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const create = async (req, res) => {
	const { title, type, author, topic, publicationDate, pages } = req.body;
	const date = new Date(publicationDate);
	const values = [title, type, author, topic, date, pages];

	try {
		const book = await createBook(values);
		if (!book) {
			res.status(400).json({
				error: "Failed to create book with the provided values",
				body: req.body,
			});
		} else {
			res.status(201).json({ book: book });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteByID = async (req, res) => {
	const { id } = req.params;

	try {
		const book = await deleteBookByID(id);
		if (!book) {
			res.status(400).json({
				error: "Failed to delete book with given id, id does not exist",
			});
		} else {
			res.status(201).json({ book: book });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAll,
	getByID,
	updateByID,
	create,
	deleteByID,
};
