const db = require("../../db");

const getPets = async (values) => {
  let str = "SELECT * FROM pets LIMIT $1 OFFSET $2 ;";
  return await db.query(str, values);
};

const postPet = async (values) => {
  const str = `INSERT INTO pets (name, age, type, breed, microchip) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
  return await db.query(str, values);
};

const getPetById = async (values) => {
  const str = `SELECT * FROM pets WHERE id = $1;`;
  return await db.query(str, values);
};

const updatePetById = async (values) => {
  const str = `UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *;`;
  return await db.query(str, values);
};

const deletePetById = async (values) => {
  const str = `DELETE FROM pets WHERE id = $1 RETURNING *;`;
  return await db.query(str, values);
};

module.exports = {
  getPets,
  postPet,
  getPetById,
  updatePetById,
  deletePetById,
};
