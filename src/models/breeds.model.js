const db = require('../../db');
const { buildQuery } = require('../utils');

const getAllBreeds = async req => {
  const base = 'SELECT ARRAY_AGG(DISTINCT breed) AS breeds FROM pets';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  try {
    const dbRes = await db.query(sqlQuery, sqlParams);

    return dbRes.rows[0];
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

module.exports = { getAllBreeds };
