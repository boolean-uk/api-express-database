const express = require("express");
const { as } = require("pg-promise");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const pet = await db.query("select * from pets");
  res.json({ pets: pet.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const pet = await db.query(`insert into pets (name,age,type,breed, microchip)
    values('${name}','${age}','${type}','${breed}','${microchip}')
    returning *
`);
  res.status(201).json({ pet: pet.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await db.query(`select * from pets where id=${id}`);
  res.json({ pet: pet.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const pet =
    await db.query(`update pets set name = '${name}',age = '${age}',type='${type}',breed='${breed}',microchip='${microchip}' where id = '${id}'
  returning *`);
  res.status(201).json({ pet: pet.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await db.query(`DELETE FROM pets WHERE id = ${id}
  RETURNING *`);
  res.status(201).json({ pet: pet.rows[0] });
});
module.exports = router;
