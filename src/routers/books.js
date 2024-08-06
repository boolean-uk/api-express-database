const router = require("express").Router();

module.exports = function (pool) {
  // GET all books
  router.get("/", async function (req, res) {
    const client = await pool.connect();
    try {
      const response = await client.query("SELECT * FROM books");
      const books = response.rows;
      res.json({ books: books });
    } catch (error) {
      console.error("Error fetching books: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  // GET a book by ID
  router.get("/:id", async function (req, res) {
    const client = await pool.connect();
    const { id } = req.params;
    try {
      const response = await client.query("SELECT * FROM books WHERE id = $1", [
        id,
      ]);
      const book = response.rows[0];
      if (book) {
        res.json({ book: book });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      console.error("Error fetching book by ID: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  // POST a new book
  router.post("/", async function (req, res) {
    const client = await pool.connect();
    const { title, author, genre, year } = req.body;
    try {
      const response = await client.query(
        "INSERT INTO books (title, author, genre, year) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, author, genre, year]
      );
      const newBook = response.rows[0];
      res.status(201).json({ book: newBook });
    } catch (error) {
      console.error("Error creating a new book: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  // PUT update an existing book by ID
  router.put("/:id", async function (req, res) {
    const client = await pool.connect();
    const { id } = req.params;
    const { title, author, genre, year } = req.body;
    try {
      const response = await client.query(
        "UPDATE books SET title = $1, author = $2, genre = $3, year = $4 WHERE id = $5 RETURNING *",
        [title, author, genre, year, id]
      );
      const updatedBook = response.rows[0];
      if (updatedBook) {
        res.json({ book: updatedBook });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      console.error("Error updating book: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  // DELETE a book by ID
  router.delete("/:id", async function (req, res) {
    const client = await pool.connect();
    const { id } = req.params;
    try {
      const response = await client.query(
        "DELETE FROM books WHERE id = $1 RETURNING *",
        [id]
      );
      const deletedBook = response.rows[0];
      if (deletedBook) {
        res.json({ book: deletedBook });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      console.error("Error deleting book: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  return router;
};
