const db = require("../../db");
const select_table = require("../routers/helpers.js");

// let selec_query = 'SELECT * FROM pets'
let selec_query = select_table("pets");

const getPets = async (req, res) => {
  const { name, breed } = req.query;
  let pets;

  if (name && breed) {
    pets = await db.query(
      selec_query.concat(" WHERE name = $1 AND breed = $2"),
      [name, breed]
    );

    return res.json({ pets: pets.rows });
  }

  if (name) {
    pets = await db.query(selec_query.concat(" WHERE name = $1"), [name]);

    return res.json({ pets: pets.rows });
  }

  if (breed) {
    const pets = await db.query(selec_query.concat(" WHERE name = $1"), [
      breed,
    ]);

    return res.json({ pets: pets.rows });
  }
  if (!name && !breed) {
    pets = await db.query(selec_query);
  }
  return res.json({ pets: pets.rows });
};

module.exports = {
  getPets,
};
