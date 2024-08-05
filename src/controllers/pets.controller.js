const client = require("../../db/index");

const getAllPets = async () => {
  try {
    const response = await client.query("SELECT * FROM pets");
    return response.rows;
  } catch (error) {
    console.log("Error:", error);
  }
};

const createPet = async (pet) => {
  try {
    const sqlQuery = `insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *`;
    const response = await client.query(sqlQuery, [
      pet.name,
      pet.age,
      pet.type,
      pet.breed,
      pet.has_microchip,
    ]);

    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

const getPetById = async (id) => {
  try {
    const response = await client.query(`SELECT * FROM pets WHERE id = ${id}`);
    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

const updatePet = async (id, petInfo) => {
  try {
    const response = await client.query(`UPDATE pets
      SET name = '${petInfo.name}', age = '${petInfo.age}', type = '${petInfo.type}', breed = '${petInfo.breed}', has_microchip = '${petInfo.has_microchip}'
      WHERE id = ${id} RETURNING *`);

    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

const deletePet = async (id) => {
  try {
    const sqlQuery = `delete from pets where id = $1 returning *`;
    const response = await client.query(sqlQuery, [id]);

    return response.rows[0];
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = {
  getAllPets,
  createPet,
  getPetById,
  updatePet,
  deletePet
};
