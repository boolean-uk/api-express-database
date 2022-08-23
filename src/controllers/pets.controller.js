const db = require('../../db');
const { buildQuery } = require('../utils');

const getAllPets = async (req, res) => {
  const base = 'SELECT * FROM pets';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  const dbRes = await db.query(sqlQuery, sqlParams);

  res.status(200).json({
    pets: dbRes.rows,
  });
};

const getPetById = async (req, res) => {
  const petId = req.params.id;
  const sqlQuery = 'SELECT * FROM pets WHERE id = $1';

  const dbRes = await db.query(sqlQuery, [petId]);

  dbRes.rows.length > 0
    ? res.status(200).json({
        pet: dbRes.rows[0],
      })
    : res
        .status(404)
        .json({ error: 'A pet with the provided ID does not exist' });
};

const postPet = async (req, res) => {
  const sqlQuery = `
  INSERT INTO
      pets(name, age, type, breed, microchip)
  VALUES
      ($1, $2, $3, $4, $5)
  RETURNING *;`;

  const params = Object.values(req.body);
  if (params.length < 5) {
    res.status(400).json({ error: 'Missing fields in the request body' });
    return;
  }

  const dbRes = await db.query(sqlQuery, params);

  res.status(201).json({
    pet: dbRes.rows[0],
  });
};

const updatePet = async (req, res) => {
  const petId = req.params.id;

  const sqlQuery = `
    UPDATE
        pets
    SET
        name = $1, age = $2, type = $3, breed = $4, microchip = $5
    WHERE
        id = $6
    RETURNING *;`;

  const params = Object.values(req.body);
  const dbRes = await db.query(sqlQuery, [...params, petId]);

  dbRes.rows.length > 0
    ? res.status(201).json({
        pet: dbRes.rows[0],
      })
    : res
        .status(404)
        .json({ error: 'A pet with the provided ID was not found' });
};

const deletePet = async (req, res) => {
  const petId = req.params.id;

  const sqlQuery = 'DELETE FROM pets WHERE id = $1 RETURNING *;';

  const dbRes = await db.query(sqlQuery, [petId]);

  dbRes.rows.length > 0
    ? res.status(201).json({
        pet: dbRes.rows[0],
      })
    : res
        .status(404)
        .json({ error: 'A pet with the provided ID was not found' });
};

module.exports = { getAllPets, getPetById, postPet, updatePet, deletePet };
