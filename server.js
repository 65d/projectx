// // const express = require('express')
// // const app = express()
// // const port = 3000
// //
// // var mysql = require('mysql');
// //
// // var con = mysql.createConnection({
// //     host: "45.136.71.95",
// //     port: 845,
// //     user: "root",
// //     password: "1111Aa!55"
// // });
// //
// // con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// // });
// //
// // app.get('/', (req, res) => {
// //     res.send('Hello World!')
// // })
// //
// // app.listen(port, () => {
// //     console.log(`Example app listening on port ${port}`)
// // })
//
// // ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1111Aa!55';
//
// // CREATE USER 'r1'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1111Aa!55'; 127.0.0.1 /etc/mysql/mysql.conf.d/mysqld.cnf
//
//
//
//
//
//
//
// const express = require('express');
// const mysql = require('mysql');
// const app = express();
//
// // Підключення до бази даних
// const connection = mysql.createConnection({
//     host: '45.136.71.95',
//     port: 3306,
//     user: 'sqluser',
//     password: '111155',
//     database: 'bankdata'
// });
//
// app.set('view engine', 'html');
//
// // Підключення до бази даних та відображення даних на HTML-сторінці
// app.get('/', (req, res) => {
//     const sql = 'SELECT * FROM `users`';
//     connection.query(sql, (err, rows) => {
//         if (err) throw err;
//         res.render('index', { data: rows });
//     //     res.sendFile(__dirname + '/index.html',{ data: rows });
//     });
// });
//
// // Запуск сервера
//     console.log('Server started on port 3000');app.listen(3000, () => {
//
//     });

//
// const express = require("express");
// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );
// app.get("/", (req, res) => {
//     res.json({ message: "ok" });
// });
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

const programmingLanguagesRouter = require("./routes/programmingLanguages");
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.get("/", (err, req, res, next) => {
    // res.json({ message: "ok" });
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

// app.use('/:id/programming-languages',programmingLanguagesRouter, function(req, res) {
//     // const userId = ;
//     console.log(req.params.id)
//     // programmingLanguagesRouter;
//     // виконуємо код з отриманим userId
// });
app.use("/api/", programmingLanguagesRouter);
/* Error handler middleware */
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({ message: err.message });
//     return;
// });
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});