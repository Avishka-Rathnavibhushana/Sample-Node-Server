const mysql = require('mysql2/promise');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nisatest'
});

pool.getConnection(function (err, connection) {
    if (err) {
        throw err;
    }
    console.log("DB connected");
});

module.exports = pool;