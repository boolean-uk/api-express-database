const {
    getAllBooks,
    createNewBook,
    getBookByid,
    updatebook,
    deletebook
} = require("../repositories/books")

const getAll = async (req, res) => {
    const books = await getAllBooks();
    res.json({ books: books })
}

const createBook = async (req, res, str, values) => {
    const book = await createNewBook(str, values)

    res.status(201).json({ book: book})
}

const getBook = async (req, res, str) => {
    const book = await getBookByid(str)
    if(book === undefined) {
        return res.status(404).json({ error: `no book with id: ${id}`})
    } else {
        return res.json({ book }) 
    }

}

const updateBook = async (req, res, str, values) => {
    const book = await updatebook(str, values)
    res.status(201).json({book})
}

const deleteBook = async (req, res, str) => {
    const book = await deletebook(str)
    res.status(201).json({book})
}

module.exports = {
    getAll,
    createBook,
    getBook,
    updateBook,
    deleteBook

}