const express = require('express');
const router = express.Router();
const db = require('../../db');
const { buildQuery } = require('../utils');

router.get('/', async (req, res) => {
  const base = 'SELECT * FROM pets';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  const dbRes = await db.query(sqlQuery, sqlParams);

  res.status(200).json({
    pets: dbRes.rows,
  });
});

router.get('/:id', async (req, res) => {
  const petId = req.params.id;
  const sqlQuery = 'SELECT * FROM pets WHERE id = $1';

  const dbRes = await db.query(sqlQuery, [petId]);

  dbRes.rows.length > 0
    ? res.status(200).json({
        pet: dbRes.rows[0],
      })
    : res.sendStatus(404);
});

router.post('/', async (req, res) => {
  const sqlQuery = `
    INSERT INTO
        pets(name, age, type, breed, microchip)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *;`;

  const params = Object.values(req.body);
  const dbRes = await db.query(sqlQuery, params);

  res.status(201).json({
    pet: dbRes.rows[0],
  });
});

router.put('/:id', async (req, res) => {
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

  res.status(201).json({
    pet: dbRes.rows[0],
  });
});

router.delete('/:id', async (req, res) => {
  const petId = req.params.id;

  const sqlQuery = 'DELETE FROM pets WHERE id = $1 RETURNING *;';
  const dbRes = await db.query(sqlQuery, [petId]);

  res.status(201).json({
    pet: dbRes.rows[0],
  });
});

module.exports = router;
