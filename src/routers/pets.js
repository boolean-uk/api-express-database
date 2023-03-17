const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const petdata = await db.query("SELECT * FROM pets;");

  res.json({ pets: petdata.rows });
});

module.exports = router;
