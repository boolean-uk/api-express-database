const db = require("../../db");

const getAllPets = async () => {
  const result = await db.query("SELECT * FROM pets");
  return result;
};
const getPetBy = async (request_param) => {
  const key = Object.keys(request_param)[0];
  const value = Object.values(request_param)[0];
  const base_query_string = "SELECT * FROM pets WHERE ";
  let query_string;
  if (key === "id") {
    query_string = base_query_string.concat("id = $1");
  }
  if (key === "name") {
    query_string = base_query_string.concat("name = $1");
  }
  const result = await db.query(query_string, [value]);
  return result;
};
const deletePet = async (request_param) => {
  const itemToDelete = await getPetBy(request_param);
  const { id } = request_param;
  await db.query("DELETE FROM pets WHERE id = $1", [id]);
  return itemToDelete;
};
const addPet = async (pet) => {
  const properties = Object.keys(pet);
  const values = Object.values(pet);
  const query_string =
    "INSERT INTO pets ".concat(`(${properties.map((p) => " ".concat(p))})`) +
    " VALUES ( $1, $2, $3, $4, $5)";
  await db.query(
    query_string,
    values.map((value) => value)
  );
};
const editPet = async (request_param, request_body) => {
  const { id } = request_param;
  const properties = Object.keys(request_body);
  const values = Object.values(request_body);
  values.push(id);
  const base_query_string = "UPDATE pets SET ";
  const query_string_updates = properties.map((property, index) =>
    property.concat(` = $${index + 1} `)
  );
  const query_string_where = " WHERE id = $6";
  const full_query_string =
    base_query_string + query_string_updates + query_string_where;
  await db.query(
    full_query_string,
    values.map((value) => value)
  );
};

module.exports = {
  getAllPets,
  getPetBy,
  deletePet,
  addPet,
  editPet,
};