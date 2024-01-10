/**
  @typedef { "SELECT" | "INSERT" | "UPDATE" | "DELETE" } Statement
  @typedef { "books" | "pets" } TableName
  @typedef { { text: String, values: ( Number | String | Boolean )[] } } Query
  @typedef { { title: String, type: String, author: String, topic: String, publication_date: String, pages: Number } } BookValues
  @typedef { { name: String, age: Number, type: String, breed: String, has_microchip: Boolean } } PetValues
  @typedef { BookValues & { id: Number } } ExistingBookValues
  @typedef { PetValues & { id: Number } } ExistingPetValues
  @typedef { BookValues | PetValues } Values
  @typedef { ExistingBookValues | ExistingPetValues } ExistingValues
 */

/**
 *
 * @param { TableName } tableName - name of table to execute select statement on
 * @param { {} } [filter] - key value pairs of filters to apply eg: { type: "dog", name: "steve" }
 * @returns { Query }
 */
function select(tableName, filter) {
  const queryText = ``;
  let paramQueryIndex = 1;
  const returnValues = [];

  let whereText = "";
  if (filter) {
    whereText = " WHERE";
    Object.entries(filter).forEach(([key, value], index) => {
      whereText += `${
        index > 0 ? " AND" : ""
      } $${paramQueryIndex++} = $${paramQueryIndex++}`;
      returnValues.push(key, value);
    });
  }

  return {
    text: `SELECT * FROM ${tableName}${whereText}`,
    values: returnValues,
  };
}

/**
 *
 * @param { TableName } tableName - name of table to execute insert statement on
 * @param { {} } values - key value pairs of values to insert eg: { type: "dog", name: "steve" }
 * @returns { Query }
 */
function insertRow(tableName, values) {
  let paramQueryIndex = 1;
  const returnValues = [];

  const columns = [];
  const datas = [];
  Object.entries(values).forEach(([key, value], index) => {
    columns.push(`${key}`);

    datas.push(`$${paramQueryIndex++}`);
    returnValues.push(value);
  });

  return {
    text: `INSERT INTO ${tableName} (${columns.toString()}) VALUES (${datas.toString()}) RETURNING *;`,
    values: returnValues,
  };
}

/**
 *
 * @param { TableName } tableName
 * @param { ExistingValues } values
 * @returns { Query }
 */
function updateRow(tableName, values) {
  let paramQueryIndex = 1;
  const returnValues = [];

  const newValues = [];
  Object.entries(values).forEach(([key, value], index) => {
    if (key !== "id") {
      newValues.push(`${key}=$${paramQueryIndex++}`);
      returnValues.push(value);
    }
  });

  returnValues.push(values.id);
  const idQueryIndex = paramQueryIndex++;

  return {
    text: `UPDATE ${tableName} SET ${newValues} WHERE id=$${idQueryIndex}`,
    values: returnValues,
  };
}

module.exports = {
  select,
  insertRow,
  updateRow,
};
