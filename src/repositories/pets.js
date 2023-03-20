const db = require('../../db');

const getAllPets = async (values, page = 1, perPage = 20) => {
    let str = 'SELECT * FROM pets';
    values.push(perPage);
    str += ` LIMIT $${values.length}`;
    if (page > 1) {
        let pagination = (page - 1) * perPage;
        str += ` OFFSET ${pagination}`;
    }
    str += ';';
    const data = await db.query(str, values);
    const pets = data.rows;
    return pets;
};

const getPetById = async (values) => {
    const str = 'SELECT * FROM pets WHERE id = $1;';
    const data = await db.query(str, values);
    const pet = data.rows[0];
    return pet;
};

const createPet = async (values) => {
    const str =
        'INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const data = await db.query(str, values);
    const pet = data.rows[0];
    return pet;
};

const updatePetById = async (values) => {
    const str =
        'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *;';
    const data = await db.query(str, values);
    const pet = data.rows[0];
    return pet;
};

const deletePetById = async (values) => {
    const str = 'DELETE from pets WHERE id = $1 RETURNING *;';
    const data = await db.query(str, values);
    const pet = data.rows[0];
    return pet;
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePetById,
    deletePetById,
};
