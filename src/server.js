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
const MissingFieldsError =  require('./errors/missingFieldsError.js')

app.use('/books', booksRouter)
app.use('/pets', petsRouter)

app.use((error, req, res, next) => {
    console.log('test')
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
        })
    }

    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = app
