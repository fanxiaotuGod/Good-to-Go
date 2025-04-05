// test-db.js
const connection = require('./db.js');

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
    } else {
        console.log('Test query result:', results[0].solution);
    }
    connection.end(); // close the connection when done
});
