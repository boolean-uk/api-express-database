const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const petdata = await db.query("SELECT * FROM pets;");

  res.json({ pets: petdata.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;

  const str = ` ('${name}', '${age}', '${type}','${breed}', '${microchip}')`;

  const petdata = await db.query(
    "INSERT INTO pets ( name, age, type, breed, microchip) VALUES" +
      str +
      "RETURNING *;"
  );

  res.status(201).json({ pet: petdata.rows[0] });
});

router.get("/:id", async (req, res) => {
  let str = "SELECT * FROM pets";
  str += ` WHERE id = ${req.params.id};`;

  const petdata = await db.query(str);

  res.json({ pet: petdata.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  let str = `name ='${name}', age ='${age}',type = '${type}', breed = '${breed}', microchip =  ${microchip}`;
  str += ` WHERE id = ${req.params.id} `;
  const petdata = await db.query("UPDATE pets SET " + str + "RETURNING *");

  res.status(201).json({ pet: petdata.rows[0] });
});

router.delete("/:id", async (req, res) => {
  let str = ` WHERE id = ${req.params.id} `;
  const petdata = await db.query("DELETE FROM pets" + str + "RETURNING *");

  res.status(201).json({ pet: petdata.rows[0] });
});

module.exports = router;
