const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//TODO: Implement books and pets APIs using Express Modular Routers
const booksRouter = require('./routers/books.js')
app.use('/pets', petsRouter) // for the Pet
app.use('/books', booksRouter) // for the Book

module.exports = app
