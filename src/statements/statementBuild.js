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
  const queryText = "SELECT * FROM $1";
  let valueCount = 1;
  const values = [];
  values.push(table);

  let whereText = "";
  if (filter) {
    whereText = " WHERE";
    Object.entries(filter).forEach(([key, value], index) => {
      whereText += `${
        index > 0 ? " AND" : ""
      } $${++valueCount} = $${++valueCount}`;
      values.push(key, value);
    });
  }

  return {
    text: queryText + whereText,
    values,
  };
}

}
