const express = require('express')
const router = express.Router()
const db = require("../../db")

const extractParams = (reqParamsObj) => {
  const keys = Object.keys(reqParamsObj)

  const result = keys.map((key) => {
    const obj = {
      name: key,
      value: reqParamsObj[key],
      type: typeof reqParamsObj[key]
    }
    return obj
  })

  return result
}

router.get('/', async (req, res) => {
  console.log(extractParams(req.query))
  const pets = await db.query(queryStr, queryVals)
})

module.exports = router