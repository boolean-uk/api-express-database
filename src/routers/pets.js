require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER, 
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

const router = express.Router();

router.get('/', async (req, res) => {
    const db = await pool.connect(); 
    const sqlQuery = 'SELECT * FROM pets'; 
    const result = await db.query(sqlQuery);

    res.json({ 
        pets: result.rows
    });
    db.release();
});


module.exports = router;