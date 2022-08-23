const db = require('../../db');
const { buildQuery } = require('../utils');

const getAllBreeds = async (req, res) => {
  if (!req.query.type) {
    res.status(400).json({ error: "Missing 'type' query parameter" });
    return;
  }

  const base = 'SELECT ARRAY_AGG(DISTINCT breed) AS breeds FROM pets';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  const dbRes = await db.query(sqlQuery, sqlParams);
  console.log(dbRes);
  res.status(200).json(dbRes.rows[0]);
};

module.exports = { getAllBreeds };
