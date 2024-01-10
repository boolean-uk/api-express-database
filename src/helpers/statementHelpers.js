const Types = require("../types.d.js");

/**
 *
 * @param { Types.TableName } tableName - name of table to execute select statement on
 * @param { Types.FilterValues } [filter] - key value pairs of filters to apply eg: { type: "dog", name: "steve" }
 * @returns { Types.Query }
 */
function selectStmt(tableName, filter) {
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
 * @param { Types.TableName } tableName - name of table to execute insert statement on
 * @param { Types.NewValues } values - key value pairs of values to insert eg: { type: "dog", name: "steve" }
 * @returns { Types.Query }
 */
function insertRowStmt(tableName, values) {
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
 * @param { Types.TableName } tableName
 * @param { Types.ExistingValues } values
 * @returns { Types.Query }
 */
function updateRowStmt(tableName, values) {
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
    text: `UPDATE ${tableName} SET ${newValues} WHERE id=$${idQueryIndex} RETURNING *`,
    values: returnValues,
  };
}

/**
 *
 * @param { Types.TableName } tableName
 * @param { Number } id
 * @returns { Types.Query }
 */
function deleteRowStmt(tableName, id) {
  return {
    text: `DELETE FROM ${tableName} WHERE id = $1`,
    values: [id],
  };
}

module.exports = {
  selectStmt,
  insertRowStmt,
  updateRowStmt,
  deleteRowStmt,
};
