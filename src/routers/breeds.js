const express = require("express");
const router = express.Router();
const db = require("../../db");
const { getBreedByType } = require("../controllers/breeds");

router.get("/breeds/:type", async (req, res) => {
  await getBreedByType(req, res);
});

module.exports = router;
