const buildQuery = (base, query) => {
  const sqlParams = buildParams(query);
  const builtQuery = buildQueryString(base, query);

  return [builtQuery, sqlParams];
};

const buildParams = query => {
  const sqlParams = [];

  for (const param in query) {
    if (param === 'page' || param === 'per_page') {
    } else sqlParams.push(query[param]);
  }

  return sqlParams;
};

const buildQueryString = (base, query) => {
  let builtQuery = base;

  const params = Object.keys(query)
    .filter(p => p !== 'page')
    .filter(p => p !== 'per_page');

  for (let i = 1; i <= params.length; i++) {
    if (i === 1) builtQuery += ` WHERE ${params[i - 1]} = $${i}`;
    else builtQuery += ` AND ${params[i - 1]} = $${i}`;
  }

  builtQuery = buildPagination(query, builtQuery);

  return builtQuery;
};

const buildPagination = (query, sqlQuery) => {
  let page = query.page - 1 ?? 0;
  let perPage = query.per_page ?? 20;

  if (page < 0) page = 0;
  if (perPage < 10) perPage = 10;
  if (perPage > 50) perPage = 50;

  return (sqlQuery += ` OFFSET ${page * perPage} LIMIT ${perPage}`);
};

module.exports = { buildQuery };
