const express = require("express")
const router = express.Router()
const {
  getPets,
  postPet,
  getPet,
  updatePet,
  deletePet,
} = require("../controllers/petsControllers")

router.get("/", getPets)
router.post("/", postPet)
router.get("/:id", getPet)
router.put("/:id", updatePet)
router.delete("/:id", deletePet)

module.exports = router
