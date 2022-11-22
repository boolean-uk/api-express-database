const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const sqlQuery = `select * from pets`;

  const result = await db.query(sqlQuery);
  res.json({
    pets: result.rows,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `select * from pets where id = $1`;

  const result = await db.query(sqlQuery, [id]);

  return res.json({
    pet: result.rows[0]
  });
});

router.post("/", async (req, res) => {
  const values = [
    req.body.name,
    req.body.age,
    req.body.type,
    req.body.breed,
    req.body.microchip,
  ];
  const sqlQuery = `insert into pets (name, age, type, breed, microchip) values ($1 , $2 , $3 , $4, $5) returning *`;
  const result = await db.query(sqlQuery, values);
  res.status(201).json({ pet: result.rows[0] })
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const values = [
    req.body.name,
    req.body.age,
    req.body.type,
    req.body.breed,
    req.body.microchip,
    id,
  ];
  const sqlQuery = `UPDATE pets
      set  name = $1 ,  age = $2, type = $3, 
      breed = $4, microchip = $5
      where id = $6  RETURNING *`;

  const result = await db.query(sqlQuery, values);
  res.status(201).json({ pet: result.rows[0] })
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `DELETE from pets 
    WHERE id = $1 RETURNING *`;

  const result = await db.query(sqlQuery, [id]);
  res.status(201).json({ pet: result.rows[0] });
});
module.exports = router;
