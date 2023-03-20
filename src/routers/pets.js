const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM pets;");

  res.status(200).json({ pets: data.rows });
});

module.exports = router;
