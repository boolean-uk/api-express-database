const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let { type } = req.query;
  console.log("type", type);

  const result = await db.query("SELECT DISTINCT breed from pets WHERE type = $1", [
    type
  ]);
  res.json({breeds: result.rows});
});

module.exports = router;
