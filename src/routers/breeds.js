const express = require("express")
const router = express.Router()
const getAllBreeds = require("../controllers/breedsControllers.js")

router.get("/", getAllBreeds)

module.exports = router
