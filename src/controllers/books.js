const db = require("../repos/books");

const getBooks = async (req, res) => {
  let { type, topic, author, page, perPage } = req.query;
  let result;
  const query = [];
  const values = [];
  let index = 1;
  let myQuery = "";

  if (type) {
    query.push(`type = $${index}`);
    values.push(type);
    index++;
  }
  if (topic) {
    query.push(`topic = $${index}`);
    values.push(topic);
    index++;
  }
  if (author) {
    query.push(`author = $${index}`);
    values.push(author);
    index++;
  }

  if (query.length > 0) {
    myQuery = "WHERE " + query.join(" AND ");
  }

  if (page === "" || page === undefined) {
    page = 1;
  }

  if (perPage === "" || perPage === undefined) {
    perPage = 20;
  }

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const offset = (pageNum - 1) * perPageNum;

  if (perPageNum > 50 || perPageNum < 10) {
    res.status(400).json({
      error: `parameter invalid perPage: ${perPageNum} not valid. Accepted range is 10 - 50`,
    });
  }

  else if (perPage || page) {
    result = await db.getBooks(myQuery, values, perPageNum, offset);
    res.json({ books: result.rows, page: pageNum, per_page: perPageNum });
  }
};

const getBooksID = async (req, res) => {
  const { id } = req.params;
  const result = await db.getBooksID(id);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no book with id: ${id}` });
  } else {
    res.json({ book: result.rows[0] });
  }
};

const createBook = async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.createBook(
    title,
    type,
    author,
    topic,
    publicationDate,
    pages
  );
  res.status(201).json({ book: result.rows[0] });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const seeTitle = await db.checkBookTitle(title, id);

  if (seeTitle.rows.length === 0 || seeTitle.rows[0].id === id) {
    const result = await db.updateBook(
      id,
      title,
      type,
      author,
      topic,
      publicationDate,
      pages
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `no book with id: ${id}`,
      });
    }

    res.status(201).json({ book: result.rows[0] });
  } else {
    return res.status(409).json({
      error: `A book with the title: ${title} already exists`,
    });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const result = await db.deleteBook(id);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no book with id: ${id}` });
  } else {
    res.status(201).json({ book: result.rows[0] });
  }
};

module.exports = { getBooks, getBooksID, createBook, updateBook, deleteBook };
