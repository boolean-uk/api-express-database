const express = require("express")
const {
  getPets,
  postPet,
  getPet,
  updatePet,
  deletePet,
} = require("../controllers/petsControllers")
const router = express.Router()

router.get("/", getPets)

router.post("/", postPet)

router.get("/:id", getPet)

router.put("/:id", updatePet)

router.delete("/:id", deletePet)

module.exports = router
