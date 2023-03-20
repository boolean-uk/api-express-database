const booksRepo = require('../repositories/books')

// const getAllBooks = async (req, res) => {
//     const { author, page, per_page } = req.query
//     let values = [];
//     let query = ''
//     if (author || page || per_page) {
//         const data = await booksRepo.getAllBooks(
//             author,
//             page,
//             per_page
//         )
//         res.json({ books: data.rows })
//     } else {
//         const data = await getBooks()
//         res.json({ books: data.rows })
//     }
// }

const postBook = async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body
    const values = [title, type, author, topic, publicationDate, pages]

    const data = await booksRepo.postBook(values)
    return res.status(201).json({ book: data.rows[0] });
}

const getBookByID = async (req, res) => {
    const id = Number(req.params.id)

    const values = [id]
    const data = await booksRepo.getBookByID(values)
    //res.json({ book: data.rows[0] })
    if(data) {
        res.json({data})
    } else {
        res.status(404).json({ error: `no book with id: ${id}`})
    }
}

const putBook = async (req, res) => { 
    const id = Number(req.params.id);
    const { title, type, author, topic, publicationDate, pages } = req.body
    const values = [id, title, type, author, topic, publicationDate, pages];

    const idControl = await booksRepo.getBookByID([id]);
    if(idControl){
        const titleControl = await booksRepo.getBookByTitle([title]);
        if(titleControl){
          return res.status(409).json({ error: `A book with the title: ${title} already exists`});
        } else {
            const book = await booksRepo.putBook(values);
            return res.status(201).json({book});
        }
    } else {
        return res.status(404).json({ error: `no book with id: ${id}`})
    }
}

 const deleteBookById = async (req, res) => { 
     const id = Number(req.params.id);
    const values = [id];
    const book = await booksRepo.deleteBookById(values);

    if(book) {
        res.status(201).json({ book });
    } else {
        res.status(404).json({ error: `no book with id: ${id}`});
    }

  
};

module.exports = {
    getAllBooks,
    postBook,
    getBookByID,
    putBook,
    deleteBookById,
}



// const booksRepo = require("../repositories/books.js");
// const db = require("../../db");

// const getBooks = async (req, res) => {
//   const queries = req.query;

//   if (queries.perPage === undefined) queries.perPage = 20;
//   if (queries.page === undefined) queries.page = 1;
//   queries.offset = queries.perPage * (queries.page - 1);

//   const values = [Number(queries.perPage), queries.offset];

//   if (queries.author !== undefined) {
//     values.push(queries.author);
//   }

//   if (queries.perPage < 10 || queries.perPage > 50) {
//     res.status(400).json({
//       error: `parameter invalid perPage: ${queries.perPage} not valid. Accepted range is 10 - 50`,
//     });
//     return;
//   }

//   const data = await booksRepo.getBooks(values);
//   const resdata = { books: data.rows };
//   if (queries.perPage || queries.page) {
//     resdata.per_page = Number(queries.perPage);
//     resdata.page = Number(queries.page);
//   }
//   return res.json(resdata);
// };



// const getBookById = async (req, res) => {
//   const id = Number(req.params.id);
//   const values = [id];
//   const data = await booksRepo.getBookById(values);
//   if (data.rowCount === 0) {
//     res.status(404).json({ error: `no book with id: ${req.params.id}` });
//     return;
//   }
//   return res.json({ book: data.rows[0] });
// };

