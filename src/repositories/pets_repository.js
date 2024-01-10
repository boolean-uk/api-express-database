const db = require("../../db");

let selectAllPets = "SELECT * FROM pets";
const getAllPets = async (name, breed) => {
  try {
    const params = [];

    if (name && breed) {
      selectAllPets += " Where name = $1 AND breed = $2";
      params.push(name, breed);
    }
    if (name && !breed) {
      selectAllPets += " WHERE name = $1";
      params.push(name);
    }

    if (!name && breed) {
      selectAllPets += " WHERE breed = $1";
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

const getPetById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

const createPet = async (name, age, type, breed, has_microchip) => {
  try {
    const result = await db.query(
      "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, age, type, breed, has_microchip]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};


module.exports = {
  getAllPets,
  getPetById,
  createPet,
};
