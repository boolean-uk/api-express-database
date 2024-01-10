const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const { type, topic } = req.query
  // const queryParamsArr = [ type, topic ].filter((param) => !!param === true)
  const queryParamsArr = Object.keys(req.query)
  console.log(queryParamsArr)

  let queryStr = 'SELECT * from books'

  if (queryParamsArr) {
    queryParamsArr.forEach((param, index) => {
      const keywordPrefix = index === 0 ? "WHERE" : "AND"
      queryStr = queryStr.concat(" ", keywordPrefix)
      queryStr = queryStr.concat(" ", `${param} = '${req.query[param]}'`)
    })
  }

  console.log(queryStr)
  const books = await db.query(queryStr)
  res.json({ books: books.rows })
})

module.exports = router
