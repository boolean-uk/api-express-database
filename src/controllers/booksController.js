const Joi = require("joi");
const dbConnection = require("../../db/index.js");
const queries = require("../queries/booksQueries.js");

// HELPER FUNCTIONS
function validateBook(req, res) {
  const schema = {
    title: Joi.string().required(),
    type: Joi.string().required(),
    author: Joi.string().required(),
    topic: Joi.string().required(),
    publication_date: Joi.string().required(),
    pages: Joi.number().required(),
  };

  return Joi.validate(req.body, schema);
}

// CONTROLLER FUNCTIONS
exports.getAllBooks = (req, res) => {
  dbConnection.query(queries.getAllBooks, (error, result) => {
    if (error) throw error;
    res.status(200).json({ books: result.rows });
  });
};

exports.getBook = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  dbConnection.query(queries.getBookById, [id], (error, result) => {
    if (error) throw error;

    const [book] = result.rows;
    if (!book) {
      return res.status(404).json({
        message: `Book with id ${id} does not exist in the database`,
      });
    }
    res.status(200).json({ book });
  });
};

exports.addBook = (req, res) => {
  // to validate book's schema
  const { error } = validateBook(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, type, author, topic, publication_date, pages } = req.body;

  dbConnection.query(
    queries.addBook,
    [title, type, author, topic, publication_date, pages],
    (error, result) => {
      if (error) throw error;
      // to get the new added book and send it to the user
      dbConnection.query(queries.getAllBooks, (error, result) => {
        if (error) throw error;
        res.status(201).json({ book: result.rows[result.rows.length - 1] });
      });
    }
  );
};

exports.deleteBook = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  // check if the book exists
  dbConnection.query(queries.getBookById, [id], (error, result) => {
    const book = result.rows;
    const noBookFound = !book.length;
    // if it does not exist send an error message
    if (noBookFound) {
      return res.status(404).json({
        message: `Book with id ${id} does not exist in the database`,
      });
    }
    // if it exists, delete it and send it to the user
    dbConnection.query(queries.deleteBookById, [id], (error, result) => {
      if (error) throw error;
      res.status(201).json({ book: book[0] });
    });
  });
};

exports.updateBook = (req, res) => {
  // to validate book's schema
  const { error } = validateBook(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const id = Number.parseInt(req.params.id, 10);
  // check if the book exists
  dbConnection.query(queries.getBookById, [id], (error, result) => {
    const noBookFound = !result.rows.length;
    // if it does not exist send an error message
    if (noBookFound) {
      return res.status(404).json({
        message: `Book with id ${id} does not exist in the database`,
      });
    }
    // if it exists, update it
    const { title, type, author, topic, publication_date, pages } = req.body;
    dbConnection.query(
      queries.updateBookById,
      [title, type, author, topic, publication_date, pages, id],
      (error, result) => {
        if (error) throw error;
        // get the updated book and send it to the user
        dbConnection.query(queries.getBookById, [id], (error, result) => {
          if (error) throw error;

          const [book] = result.rows;
          res.status(201).json({ book });
        });
      }
    );
  });
};
