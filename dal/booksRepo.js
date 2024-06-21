const dbConnection = require('../utils/dbConnection.js')

const getAllBooks = async (type, topic) => {
    const db = await dbConnection.connect()

    try {
        if (type) {
            const sqlQuery = `select * from books where type = $1`
            const result = await db.query(sqlQuery, [type])

            return result.rows
        }

        if (topic) {
            const sqlQuery = `select * from books where topic = $1`
            const result = await db.query(sqlQuery, [topic])

            return result.rows
        }

        const sqlQuery = 'select * from books'
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

module.exports = {
    getAllBooks,
}