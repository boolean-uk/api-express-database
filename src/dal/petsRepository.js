const db = require("../../db/index.js");

async function fetchAllPets() {
  const sqlQuery = "SELECT * FROM pets";

  try {
    const pets = await db.query(sqlQuery);
    return pets.rows;
  } catch (e) {
    console.log(e);
  }
}

async function fetchPetById(id) {
  const sqlQuery = "SELECT * FROM pets WHERE id = $1";

  try {
    const pets = await db.query(sqlQuery, [id]);
    return pets.rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updatePetById(id, updatedParams) {
  const sqlQuery =
    "UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 RETURNING *;";

  try {
    const result = await db.query(sqlQuery, [
      updatedParams.name,
      updatedParams.age,
      updatedParams.type,
      updatedParams.breed,
      updatedParams.has_microchip,
    ]);
    return result.rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function addPet(newPet) {
  const sqlQuery =
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  try {
    const result = await db.query(sqlQuery, [
      newPet.name,
      newPet.age,
      newPet.type,
      newPet.breed,
      newPet.has_microchip,
    ]);
    return result.rows[0]
  } catch (e) {
    console.log(e);
  }
}

async function deletePet(petId) {
    const sqlQuery = 'DELETE FROM pets WHERE id = $1 RETURNING *'

    try {
        const result = await db.query(sqlQuery, [petId])
        return result.rows[0]
    } catch (e) {
        console.log(e)
    }
}

module.exports = { fetchAllPets, fetchPetById, updatePetById, addPet, deletePet };
