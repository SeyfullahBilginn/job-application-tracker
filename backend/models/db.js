const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
// var sql = "CREATE TABLE applications (id INT AUTO_INCREMENT PRIMARY KEY ,firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR(255) UNIQUE, userType INT, password VARCHAR(255))";
// connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
// });