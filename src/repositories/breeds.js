const db = require('../../db');

const getBreeds = async (type) => {
  const breeds = await db.query(
    `SELECT DISTINCT breed FROM pets WHERE type = ${type}`
  );
  console.log(breeds);
  //   return breeds.rows;
};

module.exports = { getBreeds };
