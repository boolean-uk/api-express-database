const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//TODO: Implement books and pets APIs using Express Modular Routers
const booksRouter = require("./router/books.js");
// const petsRouter = require("./router/pets.js");

app.use("/books", booksRouter);
// app.use("/pets", petsRouter);
module.exports = app;
