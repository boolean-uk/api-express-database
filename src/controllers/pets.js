const db = require("../../db");

const getAllPets = async () => {
  const result = await db.query("SELECT * FROM pets");
  return result.rows;
};

const createPet = async (body) => {
  const { name, age, type, breed, has_microchip } = body;
  const result = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );
  return result.rows[0];
};

const getPetById = async (id) => {
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  return result.rows[0];
};

const updatePet = async (id, body) => {
    const { name, age, type, breed, has_microchip } = body;
    const result = await db.query(
      "UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 WHERE id = $6 RETURNING *",
      [name, age, type, breed, has_microchip, id]
    );
    return result.rows[0];
};

const deletePet = async (id) => {
  const result = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};



module.exports = { getAllPets,createPet,getPetById ,updatePet,deletePet};