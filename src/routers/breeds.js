const express = require('express');
const router = express.Router();
const db = require('../../db');
const { buildQuery } = require('../utils');

router.get('/', async (req, res) => {
  const base = 'SELECT ARRAY_AGG(DISTINCT breed) AS breeds FROM pets';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  const dbRes = await db.query(sqlQuery, sqlParams);
  console.log(dbRes);
  res.status(200).json(dbRes.rows[0]);
});

module.exports = router;
