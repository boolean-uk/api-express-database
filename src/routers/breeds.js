const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const queries = req.query;
  const values = [queries.type];
  const str = `SELECT DISTINCT breed FROM pets WHERE type = $1 `;
  const data = await db.query(str, values);
  res.json({ breeds: data.rows });
});

module.exports = router;
