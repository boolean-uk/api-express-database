const booksRepo = require('../repositories/books');

const getAllBooks = async (req, res) => {
    const { type, topic, author, page, perPage } = req.query;
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
    if (author) {
        query = 'author';
        values = [author];
    }
    if (perPage < 10 || perPage > 50) {
        return res.status(400).json({
            error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
        });
    }
    const books = await booksRepo.getAllBooks(values, query, page, perPage);
    const resPerPage = Number(perPage);
    const resPage = Number(page);
    res.json({ books, per_page: resPerPage, page: resPage });
};

const getBookById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const book = await booksRepo.getBookById(values);
    if (book) {
        res.json({ book });
    } else {
        res.status(404).json({ error: `no book with id: ${id}` });
    }
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
    const bookIdCheck = await booksRepo.getBookById([id]);
    if (bookIdCheck) {
        const bookTitleCheck = await booksRepo.getBookByTitle([title]);
        if (bookTitleCheck) {
            return res.status(409).json({
                error: `A book with the title: ${title} already exists`,
            });
        } else {
            const book = await booksRepo.updateBookById(values);
            return res.status(201).json({ book });
        }
    } else {
        return res.status(404).json({ error: `no book with id: ${id}` });
    }
};

const deleteBookById = async (req, res) => {
    const id = req.params.id;
    const values = [id];
    const book = await booksRepo.deleteBookById(values);
    if (book) {
        res.status(201).json({ book });
    } else {
        res.status(404).json({ error: `no book with id: ${id}` });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById,
};
