const buildQuery = (base, query) => {
  let builtQuery = base;
  const sqlParams = Object.values(query);

  const params = Object.keys(query);

  for (let i = 1; i <= params.length; i++) {
    if (i === 1) builtQuery += ` WHERE ${params[i - 1]} = $${i}`;
    else builtQuery += ` AND ${params[i - 1]} = $${i}`;
  }

  return [builtQuery, sqlParams];
};

module.exports = { buildQuery };
