const db = require("../../db");

const getAllPets = async (req, res) => {
	return db.query(`SELECT * FROM pets`);
};

const getAllPetsByTypeOrBreed = async (type, breed) => {
	let filters = "";

	if (type && breed) {
		filters = `WHERE type = $1 AND breed = $2`;

		return db.query(`SELECT * FROM pets ${filters}`, [type, breed]);
	} else if (type) {
		filters = `WHERE type = $1`;
		return db.query(`SELECT * FROM pets ${filters}`, [type]);
	} else if (breed) {
		filters = `WHERE breed = $1`;
		return db.query(`SELECT * FROM pets ${filters}`, [breed]);
	}
};

const createPet = async (values) => {
	const result = await db.query(
		"INSERT INTO pets(name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
		values
	);
	return result.rows[0];
};

module.exports = {
	getAllPets,
	getAllPetsByTypeOrBreed,
	createPet,
};
