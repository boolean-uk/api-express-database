const db = require('../../db');
const { isObjEmpty } = require('../utils');

const existsInDb = async (sqlQuery, sqlParams) => {
  try {
    const dbRes = await db.query(sqlQuery, sqlParams);
    return !isObjEmpty(dbRes.rows[0] || {});
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

module.exports = { existsInDb };
