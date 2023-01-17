const { as } = require("pg-promise");
const db = require("../../db");

const getAllPets = async (per_page = 10, page = 1) => {
  page = page * per_page - per_page;
  const pet = await db.query(`SELECT * FROM pets LIMIT $1 OFFSET $2`, [
    per_page,
    page,
  ]);

  return pet.rows;
};

const getPetById = async (id) => {
  const pet = await db.query(`SELECT * FROM pets WHERE id = ${id}`);
  return pet.rows[0];
};

const createPet = async (values) => {
  const pet = await db.query(
    "INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values
  );

  return pet.rows[0];
};

const updatePet = async (id, values) => {
  const pet = await db.query(
    "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip =$6 WHERE id = $1 RETURNING *",
    [id, ...values]
  );

  return pet.rows[0];
};

const deletePetById = async (id) => {
  const pet = await db.query(
    `DELETE FROM pets WHERE id = ${id}
  RETURNING *`
  );
  return pet.rows[0];
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePetById,
};
