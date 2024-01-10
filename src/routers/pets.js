const express = require("express");
const router = express.Router();

const db = require("../../db");

const petsController = require("../controllers/pets_controller.js");

router.get("/", petsController.getAllPets);

router.get("/:id", petsController.getPetById);

router.post("/", petsController.createPet);

router.put("/:id", petsController.updatePetById);

router.delete("/:id", petsController.deletePet);

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   const deletedPet = await db.query(
//     "DELETE FROM pets WHERE id = $1 RETURNING *",
//     [id]
//   );

//   res.status(201).json({ pet: deletedPet.rows[0] });
// });

module.exports = router;
