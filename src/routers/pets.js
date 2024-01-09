const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET route to retrieve all pets from the database
router.get("/", async (req, res) => {
  // Execute SQL query to select all pets
  const pets = await db.query("SELECT * FROM pets");
  // Respond with the fetched pets in JSON format
  res.json({ pets: pets.rows });
});

// GET route to retrieve a specific pet by its ID
router.get("/:id", async (req, res) => {
  // Extract the pet ID from the URL parameters
  const { id } = req.params;
  // Execute SQL query to select a pet by its ID
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  // Respond with the fetched pet in JSON format
  res.status(200).json({ pet: result.rows[0] });
});

// POST route to create a new pet in the database
router.post("/", async (req, res) => {
  // Extract pet details from request body
  const { name, age, type, breed, has_microchip } = req.body;
  // Execute SQL query to insert a new pet into the database
  const newPet = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );
  // Respond with the newly created pet in JSON format
  res.status(201).json({ pet: newPet.rows[0] });
});

// PUT route to update an existing pet by its ID
router.put('/:id', async (req, res) => {
  // Extract the pet ID from URL parameters and pet details from request body
  const { id } = req.params;
  const { name, age, type, breed, has_microchip } = req.body;

  // Execute SQL query to update the pet with the given ID
  const updatedPet = await db.query(
    'UPDATE pets SET name=$2, age=$3, type=$4, breed=$5, has_microchip=$6 WHERE id = $1 RETURNING *',
    [id, name, age, type, breed, has_microchip]
  )
  // Respond with the updated pet in JSON format
  res.status(201).json({ pet: updatedPet.rows[0]})
})

// DELETE route to remove a pet from the database by its ID
router.delete('/:id', async (req, res) => {
  // Extract the pet ID from the URL parameters
  const { id } = req.params;

  // Execute SQL query to delete the pet with the given ID
  const deletedPet = await db.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id]);

  // Respond with the deleted pet in JSON format
  res.status(201).json({ pet: deletedPet.rows[0] })
})

module.exports = router;
