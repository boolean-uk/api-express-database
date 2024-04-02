const db = require("../../db");

let pets;
let select_query = "SELECT * FROM pets";
const sqlPetKeys = "name, age, type, breed, has_microchip";

const getPets = async () => {
    pets = await db.query(select_query);
    return pets.rows;
};

const getPetsById = async (req_params) => {
    const { id } = req_params;
    pets = await db.query(select_query.concat(" WHERE id = $1"), [id]);
    return pets.rows[0];
};

const addNewPet = async (req_body) => {
    const { name, age, type, breed, has_microchip } = req_body;

    const newPet = await db.query(
        `INSERT INTO pets (${sqlPetKeys}) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, age, type, breed, has_microchip]
    );
    return newPet.rows[0];
};

const updatePetById = async (req_body, req_params) => {
    const { name, age, type, breed, has_microchip } = req_body;
    const { id } = req_params;
    const updatePet = await db.query(
        "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, has_microchip = $6 WHERE id = $1 RETURNING *",
        [id, name, age, type, breed, has_microchip]
    );
    return updatePet.rows[0];
};

const deletePetById = async (req_params) => {
    const { id } = req_params;
    const deletePet = await db.query(
        "DELETE FROM pets WHERE id = $1 RETURNING *",
        [id]
    );
    return deletePet.rows[0];
};

module.exports = {
    getPets,
    getPetsById,
    addNewPet,
    updatePetById,
    deletePetById,
};
