const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 🔁 <- changed from 'localhost'
    user: 'root',
    password: '12345678',
    database: 'good_to_go'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

module.exports = connection;
