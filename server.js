const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "127.0.0.1",
//     port: 3306,
//     user: "root",
//     password: "1111"
// });
//
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1111Aa!55';

// CREATE USER 'r1'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1111Aa!55'; GRANT ALL PRIVILEGES ON *.* TO 'r1'@'localhost' WITH GRANT OPTION;