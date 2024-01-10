const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  // const queryParamsArr = [ type, topic ].filter((param) => !!param === true)
  const queryParamsKeys = Object.keys(req.query)
  console.log(queryParamsKeys)

  let queryStr = 'SELECT * from books'

  if (queryParamsKeys) {
    queryParamsKeys.forEach((param, index) => {
      const keywordPrefix = index === 0 ? "WHERE" : "AND"
      queryStr = queryStr.concat(" ", keywordPrefix)
      queryStr = queryStr.concat(" ", `${param} = '${req.query[param]}'`)
    })
  }

  const books = await db.query(queryStr)
  res.json({ books: books.rows })
})

module.exports = router
