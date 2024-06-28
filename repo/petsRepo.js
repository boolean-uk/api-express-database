const dbConnection = require("../db/dbConnection.js");

async function getAllPets(req) {
  const db = await dbConnection.connect();
  try {
    const sqlQuery = "SELECT * FROM pets";
    const result = await db.query(sqlQuery);
    return result;
  } finally {
    db.release();
  }
}

async function createNewPet(req) {
  const db = await dbConnection.connect();
  const petData = require("../test/fixtures/petData.js");

  const { name, age, type, breed, has_microchip } = petData.pet1;

  try {
    const sqlQuery = `
      INSERT INTO pets (name, age, type, breed, has_microchip)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, age, type, breed, has_microchip];
    const result = await db.query(sqlQuery, values);
    return result;
  } finally {
    db.release();
  }
}

async function listPet(req) {
  const db = await dbConnection.connect();
  const { id } = req.params;

  try {
    const sqlQuery = `SELECT * FROM books WHERE id = $1;`;
    const result = await db.query(sqlQuery, [id]);
    return result;
  } finally {
    db.release();
  }
}

const updatePet = async (id, petData) => {
  const db = await dbConnection.connect();
  const { name, age, type, breed, has_microchip } = petData;

  try {
    const sqlQuery = `
      UPDATE pets
      SET name = $1,
          age = $2,
          type = $3,
          breed = $4,
          has_microchip = $5,
      WHERE id = $6
      RETURNING *;
    `;
    const values = [name, age, type, breed, has_microchip, id];
    const result = await db.query(sqlQuery, values);
    return result.rows[0];
  } finally {
    db.release();
  }
};

const deletePet = async (id) => {
  const db = await dbConnection.connect();

  try {
    const sqlQuery = `DELETE FROM pets WHERE id = $1 RETURNING *;`;
    const result = await db.query(sqlQuery, [id]);
    return result.rows[0];
  } finally {
    db.release();
  }
};

module.exports = {
  getAllPets,
  createNewPet,
  listPet,
  updatePet,
  deletePet,
};
