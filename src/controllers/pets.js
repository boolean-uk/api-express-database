const db = require("../../db");

// Function to retrieve all pets
const fetchAllPets = async () => {
  const result = await db.query("SELECT * FROM pets");
  return result.rows;
};

// Function to retrieve a single pet by ID
const fetchPetById = async (id) => {
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  return result.rows[0];
};
// Function to add a new pet
const addPet = async (dataOfPet) => {
  const { name, age, type, breed, has_microchip } = dataOfPet;
  const result = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );
  return result.rows[0];
};

module.exports = {
  fetchAllPets,
  fetchPetById,
  addPet,
};
