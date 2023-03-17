// const db = require('../../db');


// const getBooks = async (values) => {

//     let str = 'SELECT * FROM books;'
//     if (values.length !== 0) {
//         str += 'WHERE type = $1;' //there is a possibility injecting SQL => 'intentionaly' drop table?
//         //  values = [type]
//     }
//     str += ';'
//     console.log(str)
//     const data = await db.query(str, values)
//     console.log(data)
//     const books = data.rows
//     return books
//     // res.json({ books })
// }
// module.exports = {
//     getBooks
// }
