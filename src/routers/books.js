const express = require('express')
const router = express.Router()
const db = require("../../db");

const extractParams = require('../helper')

router.get('/', async (req, res) => {
  const queryParamsKeys = Object.keys(req.query)

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
