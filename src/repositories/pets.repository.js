const db = require("../../db");

const getAllPets = async () => {
  const sqlQuery = `SELECT * FROM pets`;

  try {
    const result = await db.query(sqlQuery);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

const getPetById = async (petId) => {
  const sqlQuery = `select * from pets where id = $1`;
  console.log(petId);
  try {
    const result = await db.query(sqlQuery, [petId]);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

const addPet = async (pet) => {
  const sqlQuery = `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  const params = [
    pet.name,
    pet.age,
    pet.type,
    pet.breed,
    pet.microchip
  ];

  return await db
    .query(sqlQuery, params)
    .then((result) => result.rows)
    .catch((error) => {
      console.error(error);
      throw new Error("Database Error");
    });
};

const updatePet = async (petId, pet) => {
  const sqlQuery = `UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *`;

  const params = [
    pet.name,
    pet.age,
    pet.type,
    pet.breed,
    pet.microchip,
    petId
  ];

  return await db
    .query(sqlQuery, params)
    .then((result) => result.rows)
    .catch((error) => {
      console.error(error);
      throw new Error("Database Error");
    });
};

const deletePet = async (petId) => {
  const sqlQuery = `DELETE FROM pets WHERE id = $1`;

  try {
    await db.query(sqlQuery, [petId]);
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

module.exports = {
  getAllPets,
  addPet,
  getPetById,
  updatePet,
  deletePet,
};
