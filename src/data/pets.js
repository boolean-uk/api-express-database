const db = require("./db.js");

const all = async () => {
  const result = await db.query("SELECT * FROM pets");
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  return result.rows[0];
};

const create = async (pet) => {
  const result = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [pet.name, pet.age, pet.type, pet.breed, pet.has_microchip]
  );
  return result.rows[0];
};

const update = async (id, updates) => {
  const result = await db.query(
    "UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6 RETURNING *",
    [
      updates.name,
      updates.age,
      updates.type,
      updates.breed,
      updates.has_microchip,
      id,
    ]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

module.exports = {
  all,
  getById,
  create,
  update,
  remove,
};
