const express = require("express");
const router = express.Router();
const controller = require("../controllers/petsController.js");

router.route("/").get(controller.getAllPets).post(controller.addPet);
router
  .route("/:id")
  .get(controller.getPet)
  .delete(controller.deletePet)
  .put(controller.updatePet);

module.exports = router;
