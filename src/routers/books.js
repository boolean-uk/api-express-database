require('dotenv').config()
const express = require('express')
const { Pool } = require('pg')

//const db = require("../../db");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER, 
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

const router = express.Router();

router.get('/', async (req, res) => {
    const db = await pool.connect(); 
    console.log('start');
    const sqlQuery = 'SELECT * FROM books'; 
    const result = await db.query(sqlQuery);

    res.json({ 
        books: result.rows
        
    });

    console.log(result.rows)
    
});

module.exports = router;

