const db = require("../../db");

const getPets = async (myQuery, values, perPage, offset) => {
  let query = `SELECT * from pets ${myQuery}`;

  if (perPage && offset) {
    query += ` LIMIT ${perPage} OFFSET ${offset}`;
  } else {
    query += ` LIMIT 20 OFFSET 0`;
  }

  return await db.query(query, values);
};

const createPet = async () => {
 return await db.query(
    "INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, microchip]
  );
}

const getPetsID = async (id) => {
  return await db.query("SELECT * from pets WHERE id = $1", [id]);
};

const updatePet = async (id, name, age, type, breed, microchip) => {
  return await db.query(
    "UPDATE pets SET name =$2, age=$3, type=$4, breed=$5, microchip=$6 WHERE id=$1 RETURNING *",
    [id, name, age, type, breed, microchip]
  );
}
const deletePet = async (id) => {
  return await db.query("DELETE FROM pets WHERE id=$1 RETURNING *", [id]);
};



module.exports = {
  getPets,
  createPet,
  getPetsID,
  updatePet,
  deletePet,

};
