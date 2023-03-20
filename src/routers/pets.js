const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let str = "SELECT * FROM pets ";
  const values = [];

  const queries = req.query;
  if (queries.page === undefined) queries.page = 1;
  if (queries.perPage === undefined) queries.perPage = 20;
  if (queries.perPage < 10 || queries.perPage > 50) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${queries.perPage} not valid. Accepted range is 10 - 50`,
    });
  }
  queries.offset = Number(queries.perPage) * (Number(queries.page) - 1);
  values.push(Number(queries.perPage), queries.offset);
  str += `LIMIT $1 OFFSET $2 ;`;

  const data = await db.query(str, values);
  res.json({
    pets: data.rows,
    page: Number(queries.page),
    per_page: Number(queries.perPage),
  });
});

router.post("/", async (req, res) => {
  if (Object.keys(req.body).length !== 5) {
    const fields = ["name", "age", "type", "breed", "microchip"];
    const missing = fields
      .filter((field) => (Object.keys(req.body).includes(field) ? false : true))
      .join(", ");
    return res.status(400).json({ error: `missing fields: ${missing}` });
  }
  const str = `INSERT INTO pets (name, age, type, breed, microchip) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
  const values = Object.values(req.body);
  const data = await db.query(str, values);
  res.status(201).json({ pet: data.rows[0] });
});

router.get("/:id", async (req, res) => {
  const str = `SELECT * FROM pets WHERE id = $1;`;
  const values = [Number(req.params.id)];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    return res.status(404).json({ error: `no pet with id: ${req.params.id}` });
  }
  res.json({ pet: data.rows[0] });
});

router.put("/:id", async (req, res) => {
  const str = `UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *;`;
  const values = [Number(req.params.id), ...Object.values(req.body)];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    return res.status(404).json({ error: `no pet with id: ${req.params.id}` });
  }
  res.status(201).json({ pet: data.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const str = `DELETE FROM pets WHERE id = $1 RETURNING *;`;
  const values = [Number(req.params.id)];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    return res.status(404).json({ error: `no pet with id: ${req.params.id}` });
  }
  res.status(201).json({ pet: data.rows[0] });
});

module.exports = router;
