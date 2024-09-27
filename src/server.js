const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Import routers
const booksRouter = require('./routers/books.js');
const petsRouter = require('./routers/pets.js'); 

// Use routers
app.use('/books', booksRouter);
app.use('/pets', petsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
