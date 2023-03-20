const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM pets;");

  res.status(200).json({ pets: data.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  //write sql instructions
  const str =
    "INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
  //values
  const values = [name, age, type, breed, microchip];

  // get sql instructions and values to input (data = await...)
  const data = await db.query(str, values);
  //res.json...
  res.status(201).json({ pet: data.rows[0] });
});

router.get("/:id", async (req, res) => {
  //convert id as string to a Number
  const id = Number(req.params.id);

  //write sql instructions to get where id = id
  const str = "SELECT * FROM pets WHERE id = $1;";

  //values
  const values = [id];

  // get sql instructions and values to input (data = await...)
  const pet = await db.query(str, values);
  //res.json...
  res.status(200).json({ pet: pet.rows[0] });
});

router.put("/:id", async (req, res) => {
  // get id
  const id = Number(req.params.id);
  // get table headings from body
  const { name, age, type, breed, microchip } = req.body;

  // Remember to return all the data after it has been updated and the ";"
  const str =
    "UPDATE pets SET name = $2, age = $3, type= $4, breed= $5, microchip= $6 WHERE id = $1 RETURNING *;";
  const values = [id, name, age, type, breed, microchip];

  const data = await db.query(str, values);
  const pet = data.rows[0];

  res.status(201).json({ pet });
});

router.delete("/:id", async (req, res) => {
  //convert id as string to a Number
  const id = Number(req.params.id);

  //write sql instructions to delete where id = id: remember RETURNING *
  const str = "DELETE FROM pets WHERE id = $1 RETURNING *;";

  //values
  const values = [id];

  // get sql instructions and values to input (data = await...)
  const pet = await db.query(str, values);
  //res.json...
  res.status(201).json({ pet: pet.rows[0] });
});

module.exports = router;
