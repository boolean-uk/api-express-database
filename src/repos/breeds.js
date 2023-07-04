const db = require("../../db");

const getBreeds = async (type) => {
    return await db.query("SELECT DISTINCT breed from pets WHERE type = $1", [
        type
      ]);
}

module.exports = {
getBreeds
  };
  