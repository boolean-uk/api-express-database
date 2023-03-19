const booksRepo = require('../repositories/books');

const getAllBooks = async (req, res) => {
    const { type, topic } = req.query;
    let values = [];
    let query = '';

    if (type) {
        query = 'type';
        values = [type];
    }
    if (topic) {
        query = 'topic';
        values = [topic];
    }

    const books = await booksRepo.getAllBooks(values, query);
    res.json({ books });
};

const getBookById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const book = await booksRepo.getBookById(values);
    res.json({ book });
};

const createBook = async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body;
    const values = [title, type, author, topic, publicationDate, pages];
    const book = await booksRepo.createBook(values);
    res.status(201).json({ book });
};

const updateBookById = async (req, res) => {
    const id = req.params.id;
    const { title, type, author, topic, publicationDate, pages } = req.body;
    const values = [title, type, author, topic, publicationDate, pages, id];
    const book = await booksRepo.updateBookById(values);
    res.status(201).json({ book });
};

const deleteBookById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const book = await booksRepo.deleteBookById(values);
    res.status(201).json({ book });
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById,
};
