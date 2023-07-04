const express = require("express");
const router = express.Router();
const db = require("../../db");

const fetchPets = async (req, res) => {
  const { type } = req.query;
  let query = "SELECT * FROM pets";
  const values = [];

  if (type) {
    values.push(type);
    query += " WHERE type ILIKE $1";
  }

  try {
    const result = await db.query(query, values);
    res.json({ pets: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch pets from the database" });
  }
};

const createPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO pets (name, age, type, breed, microchip)" +
        "VALUES ($1, $2, $3, $4, $5)" +
        "RETURNING *",
      [name, age, type, breed, microchip]
    );
    res.status(201).json({ pet: result.rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create a new pet in the database" });
  }
};

const fetchPetById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
    res.json({ pet: result.rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Failed to retrieve the specified pet from the database",
      });
  }
};

const updatePet = async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, type, breed, microchip } = req.body;

  try {
    const result = await db.query(
      "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *",
      [id, name, age, type, breed, microchip]
    );
    res.status(201).json({ pet: result.rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update the specified pet in the database" });
  }
};

const deletePet = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await db.query(
      "DELETE FROM pets WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(201).json({ pet: result.rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to delete the specified pet from the database" });
  }
};

router.get("/", fetchPets);
router.post("/", createPet);
router.get("/:id", fetchPetById);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
