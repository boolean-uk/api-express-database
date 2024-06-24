require('dotenv').config()
require('express-async-errors')
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//TODO: Implement books and pets APIs using Express Modular Routers
const booksRouter = require('./routers/books.js')
app.use('/books', booksRouter)

//Error handling
const { MissingFieldsError, NoDataError } = require('./errors/errors.js')

app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({error: error.message})
    }
    if (error instanceof NoDataError) {
        return res.status(404).json({error: error.message})
    }

    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = app
