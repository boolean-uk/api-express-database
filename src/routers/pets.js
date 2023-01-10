const express = require("express");
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
  res.json({ pets: createPet.rows[0] });
});
module.exports = router;
