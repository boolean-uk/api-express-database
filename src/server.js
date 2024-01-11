const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//TODO: Implement books and pets APIs using Express Modular Routers
const booksRouter = require('./routers/booksRouter.js')
const petsRouter = require('./routers/petsRouter.js')
const breedsRouter = require('./routers/breedsRouter.js')

app.use('/books', booksRouter)
app.use('/pets', petsRouter)
app.use('/breeds', breedsRouter)

module.exports = app
