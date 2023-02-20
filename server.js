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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})