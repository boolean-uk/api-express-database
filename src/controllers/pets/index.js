const dbConnection = require('../../utils/dbConnection.js')

const getAllPets = async () => {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'select * from pets'
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

module.exports = {
    getAllPets
}