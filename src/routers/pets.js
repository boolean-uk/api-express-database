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

//Get all pets 
router.get('/', async (req, res) => {
    const db = await pool.connect(); 
    const sqlQuery = 'SELECT * FROM pets'; 
    const result = await db.query(sqlQuery);

    res.json({ 
        pets: result.rows
    });
    db.release();
});

//gets pet by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const db = await pool.connect()
    const sqlQuery = 'SELECT * FROM pets WHERE id = $1'
    const result = await db.query(sqlQuery, [id])

    if (result.rows.length > 0) {
        res.json({pet: result.rows[0] })
    } else {
        res.status(404).json({ error: 'pet not found'})
    }
    db.release()
})

//Add to pet
router.post('/', async (req, res) => {
    const {name, age, type, breed, has_microchip} = req.body 
    const db = await pool.connect()
    const sqlQuery = 'INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const result = await db.query(sqlQuery, [name, age, type, breed, has_microchip])
    res.status(201).json({pet: result.rows[0]})

    db.release()
})

// Wdit pets
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const {name, age, type, breed, has_microchip} = req.body 
    const db = await pool.connect()
    const sqlQuery = `
        UPDATE pets
        SET name = $1,
            age = $2,
            type = $3, 
            breed = $4, 
            has_microchip = $5
            WHERE id = $6
            RETURNING *
    `
    const result = await db.query(sqlQuery, [name, age, type, breed, has_microchip, id])

    if (result.rows.length > 0) {
        res.json({pet: result.rows[0]})
    } else {
    res.status(400).json({ error: 'Pet not found' })
    }
})


//Deletes pet 

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await pool.connect();
    const sqlQuery = 'DELETE FROM pets WHERE id = $1 RETURNING *';
    const result = await db.query(sqlQuery, [id]);

    if (result.rows.length > 0) {
        res.json({ message: 'Pet deleted', pet: result.rows[0] });
    } else {
        res.status(404).json({ error: 'Pet not found' });
    }
    db.release();
});


module.exports = router;