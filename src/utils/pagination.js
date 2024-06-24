const MissingFieldError = require("../errors/MissingFieldError")

const getPaginationParams = (req) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const per_page = req.query.perPage ? Number(req.query.perPage) : 20

  if (per_page > 50 || per_page < 10) {
    throw new MissingFieldError(
      `parameter invalid perPage: ${per_page} not valid. Accepted range is 10 - 50`
    )
  }

  return { page, per_page }
}

module.exports = getPaginationParams
