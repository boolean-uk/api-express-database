const express = require("express");
const router = express.Router();
const db = require("../../db");

class NotFoundError extends Error {
  statusCode = 404;
}
class EntityExistsError extends Error {
  statusCode = 409;
}

function queryBuilder(sql, columns) {
  const page = columns.find((c) => c === "page");
  const perPage = columns.find((c) => c === "per_page");
  const indexOfPage = columns.indexOf(page);
  const indexOfPerPage = columns.indexOf(perPage);

  if (columns.length) {
    let newColumns = [];
    for (i = 0; i < columns.length; i++) {
      console.log(columns[i]);
      if (columns[i] !== "per_page" || columns[i] !== "page") {
        newColumns.push(columns[i]);
      }
    }

    const column = newColumns.map((column, index) => {
      return `${column} = $${index + 1}`;
    });

    sql += "WHERE " + column.join(" AND ");
  }
  if (page && perPage) {
    return (sql += ` OFFSET (($${indexOfPage + 1} - 1) * 20) LIMIT $${
      indexOfPerPage + 1
    }`);
  }
  if (page) {
    const indexOfPage = columns.indexOf(page);

    sql += ` OFFSET (($${indexOfPage + 1} - 1) * 20) LIMIT 20`;
  }
  if (perPage) {
    const indexOfPerPage = columns.indexOf(perPage);
    sql += ` LIMIT $${indexOfPerPage + 1}`;
  }

  return sql;
}

router.get("/", async (req, res) => {
  const sqlQuery = queryBuilder("SELECT * FROM books ", Object.keys(req.query));
  const result = await db.query(sqlQuery, Object.values(req.query));

  res.json({
    books: result.rows,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = `select * from books where id = $1`;

  const result = await db.query(sqlQuery, [id]);
  if (!result.rows.length) {
    const error = new NotFoundError(
      `A book with the provided ID does not exist.`
    );
    next(error);
  }

  return res.json({
    book: result.rows[0],
  });
});

router.post("/", async (req, res) => {
  const newDate = new Date(req.body.publicationDate);
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    newDate,
    req.body.pages,
  ];
  const sqlQuery = `insert into books (title, type, author, topic, "publicationDate", pages) values ($1 , $2 , $3 , $4, $5, $6 ) returning *`;
  const result = await db.query(sqlQuery, values);
  res.status(201).json({ book: result.rows[0] });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const newDate = new Date(req.body.publicationDate);
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    newDate,
    req.body.pages,
    id,
  ];
  const sqlQuery = `UPDATE books
    set  title = $1 ,  type = $2, author = $3, 
    topic = $4, "publicationDate" = $5, pages = $6
    where id = $7  RETURNING *`;
  const titleQuery = `select * from books where title = $1`;
  const result = await db.query(sqlQuery, values);
  const titleAlreadyExist = await db.query(titleQuery, [req.body.title]);

  if (!result.rows.length) {
    const error = new NotFoundError(
      `A book with the provided ID does not exist.`
    );
    next(error);
  }

  if (titleAlreadyExist) {
    const error = new EntityExistsError(
      "A book with the provided title already exists"
    );
   next(error);
  }
  res.status(201).json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `DELETE from books 
  WHERE id = $1 RETURNING *`;

  const result = await db.query(sqlQuery, [id]);
  if (!result.rows.length) {
    const error = new NotFoundError(
      `A book with the provided ID does not exist.`
    );
    next(error);
  }
  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
