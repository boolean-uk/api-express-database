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
module.exports = {
  fetchAllPets,
  fetchPetById,
};
