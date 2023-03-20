const db = require("../../db");

const getAllPets = async () => {
    const petsdata = await db.query("SELECT * FROM pets;");

    return petsdata.rows;
};

const createNewPet = async (str, values) => {
    const petdata = await db.query(
        `INSERT INTO pets (name, age, type, breed, microchip) 
    VALUES`
        + str
        + `RETURNING *;`,
        values
    )

    return petdata.rows[0]
}

const getPetByid = async (str) => {
    const petdata = await db.query(str)
    const pet = petdata.rows[0]
    return pet
}

const updatepet = async (str, values) => {
    const petdata = await db.query(str, values)
    return petdata.rows[0]
}

const deletepet = async (str) => {
    const petdata = await db.query("DELETE FROM pets WHERE id = " + str + ` RETURNING *;`)
    return petdata.rows[0]
}

module.exports = {
    getAllPets,
    createNewPet,
    getPetByid,
    updatepet,
    deletepet
}