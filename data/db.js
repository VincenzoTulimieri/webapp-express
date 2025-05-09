// importazione mysql
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vincenzo22',
    database: 'movies_db'
})

connection.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connesso a MYsql, ci sono anche io')
})

module.exports = connection