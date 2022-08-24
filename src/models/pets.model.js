const db = require('../../db');
const { buildQuery } = require('../utils');

const getAllPets = async (req, res) => {
  const base = 'SELECT * FROM pets';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  try {
    const dbRes = await db.query(sqlQuery, sqlParams);

    return dbRes.rows;
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const getPetById = async petId => {
  const sqlQuery = 'SELECT * FROM pets WHERE id = $1';

  try {
    const dbRes = await db.query(sqlQuery, [petId]);

    return dbRes.rows[0] || {};
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const postPet = async params => {
  const sqlQuery = `
  INSERT INTO
      pets(name, age, type, breed, microchip)
  VALUES
      ($1, $2, $3, $4, $5)
  RETURNING *;`;

  try {
    const dbRes = await db.query(sqlQuery, params);

    return dbRes.rows[0];
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const updatePet = async (params, petId) => {
  const sqlQuery = `
    UPDATE
        pets
    SET
        name = $1, age = $2, type = $3, breed = $4, microchip = $5
    WHERE
        id = $6
    RETURNING *;`;

  try {
    const dbRes = await db.query(sqlQuery, [...params, petId]);

    return dbRes.rows[0] || {};
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const deletePet = async petId => {
  const sqlQuery = 'DELETE FROM pets WHERE id = $1 RETURNING *;';

  try {
    const dbRes = await db.query(sqlQuery, [petId]);

    return dbRes.rows[0] || {};
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

module.exports = { getAllPets, getPetById, postPet, updatePet, deletePet };
