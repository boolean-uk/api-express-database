const queryBuilder = (sql, arrOfQueries, paginationObject = undefined, constraint = "AND") => {

    console.log('inside query builder: ',paginationObject);

  if (arrOfQueries.length) {
    sql += " WHERE ";
  }

  const mappedQueries = arrOfQueries.map(
    (query, index) => `LOWER(${query}) = $${index + 1}`
  );

  return (
    sql +
    mappedQueries.join(` ${constraint} `) + (paginationObject.per_page ? ` LIMIT $${mappedQueries.length + 1} `:'') + (paginationObject ? `OFFSET $${mappedQueries.length + 2} `:'')
  );
};

const extractPagination = (params) => {
    if (params.page && params.per_page) {
        const { page, per_page } = params;
        delete params.page;
        delete params.per_page;
        return { page, per_page };
      }
}

module.exports = { queryBuilder, extractPagination };
