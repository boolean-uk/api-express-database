const db = require("../../db");

let pets;
let select_query = "SELECT * FROM pets";
const sqlPetKeys = "name, age, type, breed, has_microchip";

const getAllPets = async () => {
    pets = await db.query(select_query);
    return pets.rows;
};

const addNewPet = async (req_body) => {
    const { name, age, type, breed, has_microchip } = req_body;
    
    const newPet = await db.query(
        `INSERT INTO pets (${sqlPetKeys}) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, age, type, breed, has_microchip]
        );
        
    return newPet.rows[0];
};

module.exports = {
    getAllPets,
    addNewPet,
};
