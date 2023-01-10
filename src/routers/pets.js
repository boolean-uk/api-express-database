const express = require("express");
const { as } = require("pg-promise");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const getAllPets = await db.query("select * from pets");
  res.json({ pets: getAllPets.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const createPet =
    await db.query(`insert into pets (name,age,type,breed, microchip)
    values('${name}','${age}','${type}','${breed}','${microchip}')
    returning *
`);
  res.status(201).json({ pet: createPet.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const getPetById = await db.query(`select * from pets where id=${id}`);
  res.json({ pet: getPetById.rows });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const updatedPet =
    await db.query(`update pets set name = '${name}',age = '${age}',type='${type}',breed='${breed}',microchip='${microchip}' where id = '${id}'
  returning *`);
  res.status(201).json({ pet: updatedPet.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletePet = await db.query(`delete from pets where id = '${id}'
  returning *`);
  res.status(201).json({ pets: deletePet.rows[0] });
});
module.exports = router;
