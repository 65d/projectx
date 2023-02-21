// const express = require('express')
// const app = express()
// const port = 3000
//
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//     host: "45.136.71.95",
//     port: 845,
//     user: "root",
//     password: "1111Aa!55"
// });
//
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
//
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1111Aa!55';

// CREATE USER 'r1'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1111Aa!55'; 127.0.0.1 /etc/mysql/mysql.conf.d/mysqld.cnf







const express = require('express');
const mysql = require('mysql');
const app = express();

// Підключення до бази даних
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '111155',
    database: 'bankdata'
});

// Підключення до бази даних та відображення даних на HTML-сторінці
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM `users`';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
    //     res.render('index.html');
        res.sendFile(__dirname + '/index.html');
    });
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server started on port 3000');
});