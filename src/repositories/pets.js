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

const getPetByID = async (id) => {
	return db.query(`SELECT * FROM pets WHERE id = $1`, [id]);
};

const createPet = async (values) => {
	const result = await db.query(
		"INSERT INTO pets(name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
		values
	);
	return result.rows[0];
};

const updatePetByID = async (id, values) => {
	const result = await db.query(
		`UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *`,
		[...values, id]
	);
	return result.rows[0];
};

const deletePetByID = async (id) => {
	const result = await db.query("DELETE from pets WHERE id = $1 RETURNING *", [
		id,
	]);
	return result.rows[0];
};

module.exports = {
	getAllPets,
	getAllPetsByTypeOrBreed,
	createPet,
	getPetByID,
	updatePetByID,
	deletePetByID,
};
