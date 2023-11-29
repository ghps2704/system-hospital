const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gui271004?',
  database: 'hospital_db',
});

module.exports = connection;
