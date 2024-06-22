const dbConnection = require('../../utils/dbConnection')

async function getAllBooks() {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = 'SELECT * FROM BOOKS'
        const result = await db.query(sqlQuery)
        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

module.exports = getAllBooks 