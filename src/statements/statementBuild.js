/**
  @typedef { "SELECT" | "INSERT" | "UPDATE" | "DELETE" } Statement
  @typedef { "books" | "pets" } Table
  @typedef { { text: String, values: ( Number | String | Boolean )[] } } Query
 */

/**
 *
 * @param { Table } table - name of table to execute select statement on
 * @param { {} } [filter] - key value pairs of filters to apply eg: { type: "dog", name: "steve" }
 * @returns { Query }
 */
function select(table, filter) {
  const queryText = `SELECT * FROM ${table}`;
  let valueCount = 1;
  const values = [];

  let whereText = "";
  if (filter) {
    whereText = " WHERE";
    Object.entries(filter).forEach(([key, value], index) => {
      whereText += `${
        index > 0 ? " AND" : ""
      } $${valueCount++} = $${valueCount++}`;
      values.push(key, value);
    });
  }

  return {
    text: queryText + whereText,
    values,
  };
}

/**
 *
 * @param { Table } table - name of table to execute insert statement on
 * @param { {} } values - key value pairs of values to insert eg: { type: "dog", name: "steve" }
 * @returns { Query }
 */
function insert(table, values) {
  let valueCount = 1;
  const returnValues = [];
  let queryText = `INSERT INTO ${table}`;

  const columns = [];
  const datas = [];
  Object.entries(values).forEach(([key, value], index) => {
    columns.push(`${key}`);

    datas.push(`$${valueCount++}`);
    returnValues.push(value);
  });

  return {
    text: `${queryText} (${columns.toString()}) VALUES (${datas.toString()}) RETURNING *;`,
    values: returnValues,
  };
}

module.exports = {
  select,
  insert,
};
