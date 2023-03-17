const db = require("../../db");

const getAllpets = async () => {
  const petdata = await db.query("SELECT * FROM pets;");

  return petdata.rows;
};

const createNewpet = async (str) => {
  const petdata = await db.query(
    "INSERT INTO pets ( name, age, type, breed, microchip) VALUES" +
      str +
      "RETURNING *;"
  );

  return petdata.rows[0];
};

const getpetById = async (str) => {
  const petdata = await db.query(str);

  return petdata.rows[0];
};

const updatepet = async (str) => {
  const petdata = await db.query("UPDATE pets SET " + str + "RETURNING *");

  return petdata.rows[0];
};

const deletepet = async (str) => {
  const petdata = await db.query("DELETE FROM pets" + str + "RETURNING *");

  return petdata.rows[0];
};

module.exports = {
  getAllpets,
  createNewpet,
  getpetById,
  updatepet,
  deletepet,
};
