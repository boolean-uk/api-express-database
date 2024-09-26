const db = require("../../db");

const getAllPets = async () => {
  const pets = await db.query("SELECT * FROM pets");

  return pets.rows;
};

const createPet = async (request_body) => {
  const { name, age, type, breed, has_microchip } = request_body;

  const newPet = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );

  return newPet.rows[0];
};

const getPetById = async (id) => {
  const pet = await db.query("SELECT * FROM pets WHERE id = $1", [id]);

  return pet.rows[0];
};

const updatePet = async (id, request_body) => {
  const { name, age, type, breed, has_microchip } = request_body;

  const updatedPet = await db.query(
    "UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 WHERE id = $6 RETURNING *",
    [name, age, type, breed, has_microchip, id]
  );

  return updatedPet.rows[0];
};

const deletePet = async (id) => {
  const deletedPet = await db.query(
    "DELETE FROM pets WHERE id = $1 RETURNING *",
    [id]
  );

  return deletedPet.rows[0];
};

module.exports = {
  getAllPets,
  createPet,
  getPetById,
  updatePet,
  deletePet,
};
