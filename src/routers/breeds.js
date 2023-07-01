const express = require("express");
const router = express.Router();
const db = require("../../db/index");

router.get("/", async (req, res) => {
  const { type } = req.query;
  console.log("type", type);
  const result = await db.query(
    `SELECT DISTINCT breed FROM pets WHERE type = $1`,
    [type]
  );

  res.json({ breeds: result.rows });
});

module.exports = router;
