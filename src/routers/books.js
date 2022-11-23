const express = require("express");
const router = express.Router();
const db = require("../../db");

function queryBuilder(sql, columns) {
  const page = columns.find((c) => c === "page");
  const perPage = columns.find((c) => c === "per_page");
  const indexOfPage = columns.indexOf(page);
  const indexOfPerPage = columns.indexOf(perPage);

  if (columns.length) {
    let newColumns = []
    for (i = 0; i < columns.length; i++) {
      console.log(columns[i])
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
    return (sql += ` OFFSET (($${indexOfPage + 1} - 1) * 20) LIMIT $${indexOfPerPage + 1}`);
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
  console.log("HEREwwwwwww", sqlQuery);

  const result = await db.query(sqlQuery, Object.values(req.query));

  res.json({
    books: result.rows,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `select * from books where id = $1`;

  const result = await db.query(sqlQuery, [id]);

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

router.put("/:id", async (req, res) => {
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

  const result = await db.query(sqlQuery, values);
  res.status(201).json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `DELETE from books 
  WHERE id = $1 RETURNING *`;

  const result = await db.query(sqlQuery, [id]);

  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
