const { as } = require("pg-promise");
const db = require("../../db");

const getAllPets = async () => {
  const result = await db.query("SELECT * FROM pets");

  return result.rows;
};

const getPetById = async (id) => {
  const result = await db.query(`SELECT * FROM pets WHERE id = ${id}`);
  return result.rows;
};

const createPet = async (values) => {
  const result = await db.query(
    "INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values
  );

  return result.rows[0];
};

const updatePet = async (id, values) => {
  const result = await db.query(
    "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip =$6 WHERE id = $1 RETURNING *",
    [id, ...values]
  );

  return result.rows[0];
};

const deletePetById = async (id) => {
  const result = await db.query(
    `DELETE FROM pets WHERE id = ${id}
  RETURNING *`
  );
  return result.rows;
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePetById,
};
