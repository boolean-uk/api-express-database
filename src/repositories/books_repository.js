const db = require("../../db");

let selectAllBooks = "SELECT * FROM books";

const getAllBooks = async (title, author) => {
  try {
    const params = [];

    if (title && author) {
      selectAllBooks += " Where title = $1 AND author = $2";
      params.push(title, author);
    }
    if (title && !author) {
      selectAllBooks += " WHERE title = $1";
      params.push(title);
    }

    if (!title && author) {
      selectAllBooks += " WHERE author = $1";
      params.push(author);
    }
    const result = await db.query(selectAllBooks, params);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database error occured");
  }
};

// router.get("/", async (req, res) => {
//   const { title, author } = req.query;

//   if (title && author) {
//     const books = await db.query(
//       "SELECT * FROM books WHERE title = $1 AND author = $2",
//       [title, author]
//     );

//     return res.json({ books: books.rows });
//   }

//   if (title) {
//     const books = await db.query("SELECT * FROM books WHERE title = $1", [
//       title,
//     ]);

//     return res.json({ books: books.rows });
//   }

//   if (author) {
//     const books = await db.query("SELECT * FROM books WHERE author = $1", [
//       author,
//     ]);

//     return res.json({ books: books.rows });
//   }

//   const books = await db.query("SELECT * FROM books");
//   res.json({ books: books.rows });
// });

module.exports = {
  getAllBooks,
};
