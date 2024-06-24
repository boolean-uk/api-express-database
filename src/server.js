require('dotenv').config()
const express = require("express");
require('express-async-errors');
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const booksRouter = require('./routers/books.js')
const petsRouter = require('./routers/pets.js')
const MissingFieldsError =  require('./errors/missingFieldsError.js')
const NotFoundError = require('./errors/notFoundError.js')

app.use('/books', booksRouter)
app.use('/pets', petsRouter)

app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
        })
    }

    if (error instanceof NotFoundError) {
        return res.status(404).json({
            error: error.message
        })
    }

    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = app
