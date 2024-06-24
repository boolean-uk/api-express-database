require("dotenv").config()
const express = require("express")
require("express-async-errors")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const booksRouter = require("./routers/books.js")
const petsRouter = require("./routers/pets.js")
const breedsRouter = require("./routers/breeds.js")
const MissingFieldError = require("./errors/MissingFieldError.js")
const NotFoundError = require("./errors/NotFoundError.js")
const ConflictError = require("./errors/ConflictError.js")

app.use("/books", booksRouter)
app.use("/pets", petsRouter)
app.use("/breeds", breedsRouter)

app.use((error, req, res, next) => {
  if (error instanceof MissingFieldError) {
    res.status(400).json({
      error: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({
      error: error.message,
    })
  }

  if (error instanceof ConflictError) {
    res.status(409).json({
      error: error.message,
    })
  }
})

module.exports = app
