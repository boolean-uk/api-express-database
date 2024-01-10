const db = require("../../db");

const getAllPets = async (name, breed) => {
  try {
    let selectAllPets = "SELECT * FROM pets";
    const params = [];

    if (name && breed) {
      selectAllPets = selectAllPets.concat(" Where name = $1 AND breed = $2");
      params.push(name, breed);
    }
    if (name && !breed) {
      selectAllPets = selectAllPets.concat(" WHERE name = $1");
      params.push(name);
    }

    if (!name && breed) {
      selectAllPets = selectAllPets.concat(" WHERE breed = $1");
      params.push(breed);
      console.log(params);
    }
    const result = await db.query(selectAllPets, params);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database error occured");
  }
};

module.exports = {
  getAllPets,
};
