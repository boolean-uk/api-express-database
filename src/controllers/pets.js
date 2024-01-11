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

// Function to modify an existing pet
const modifyPet = async (id, thePetData) => {
  const { name, age, type, breed, has_microchip } = thePetData;
  const result = await db.query(
    "UPDATE pets SET name=$2, age=$3, type=$4, breed=$5, has_microchip=$6 WHERE id = $1 RETURNING *",
    [id, name, age, type, breed, has_microchip]
  );
  return result.rows[0];
};

// Function to remove a pet
const removePet = async (id) => {
  const result = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

module.exports = {
  fetchAllPets,
  fetchPetById,
  addPet,
  modifyPet,
  removePet,
};
