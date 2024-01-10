/**
  @typedef { "SELECT" | "INSERT" | "UPDATE" | "DELETE" } Statement
  @typedef { "books" | "pets" } TableName
  @typedef { { text: String, values: ( Number | String | Boolean )[] } } Query
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
function insert(tableName, values) {
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

function update(tableName, values) {
  let paramQueryIndex = 1;
  const returnValues = [];

  returnValues.push(values.id);
  const idValueCount = paramQueryIndex++;
  delete values.id;

  const newValues = [];
  Object.entries(values).forEach(([key, value], index) => {
    newValues.push(`${key}=$${paramQueryIndex++}`);
    returnValues.push(value);
  });

  return {
    text: `UPDATE ${tableName} SET ${newValues} WHERE id=$${idValueCount}`,
    values: returnValues,
  };
}

module.exports = {
  select,
  insert,
  update,
};
