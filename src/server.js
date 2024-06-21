require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const booksRouter = require('./routers/books.js')
const petsRouter = require('./routers/pets.js')

app.use('/books', booksRouter)
app.use('/pets', petsRouter)

module.exports = app
