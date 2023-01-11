const db = require("../../db");

const getAllPets = async () => {
  const pets = await db.query("SELECT * FROM pets");
  return pets.rows;
};

const createPet = async (values) => {
  const pet = await db.query(
    `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    values
  );
  return pet.rows[0];
};

const getPet = async (id) => {
  const pet = await db.query(`SELECT * FROM pets WHERE id = ${id} `);
  return pet.rows[0];
};

const updatePet = async (values, id) => {
  const pet = await db.query(
    `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    values
  );
  return pet.rows[0];
};

const deletePet = async (id) => {
  const pet = await db.query(`DELETE FROM pets WHERE id = ${id} RETURNING *`);
  return pet.rows[0];
};

module.exports = {
  createPet,
  getAllPets,
  getPet,
  updatePet,
  deletePet
};
