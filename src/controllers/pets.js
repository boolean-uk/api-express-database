const db = require("../../db/index.js");
const getAllPets = async () => {
  const pets = await db.query("SELECT * FROM pets");
  return pets.rows;
};
const postPetById = async (request_body) => {
  const { name, age, type, breed, has_microchip } = request_body;

  // RETURNING keyword is for INSERT, UPDATE and DELETE queries to show us what row of data has been created/updated/deleted
  const newPet = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );
  return newPet.rows[0];
};
const getAPetById = async (id) => {
  const pet = await db.query("SELECT * FROM pets WHERE id = $1", [id]);

  return pet.rows;
};
// controllers/movies.js
// Same file where `getAllMovies` function lives

const updatePetById = async (id, request_body) => {
  const { name, age, type, breed, has_microchip } = request_body;

  const updatedPet = await db.query(
    "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5 , has_microchip = $6 WHERE id = $1 RETURNING *",
    [id, name, age, type, breed, has_microchip]
  );

  return updatedPet.rows[0];
};
const deletePetById = async (id) => {
  const deletedPet = await db.query(
    "DELETE FROM pets WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedPet.rows[0];
};

module.exports = {
  getAllPets,
  postPetById,
  getAPetById,
  updatePetById,
  deletePetById,
};
