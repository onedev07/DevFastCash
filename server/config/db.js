/* const mysql = require('mysql')

const db = mysql.createConnection({
host: "91.216.107.184",
user: "ephey1699662_1sgjq6",
password: "pnceeovfaw",
database:"ephey1699662_1sgjq6" 
})

module.exports = db; */


var mysql = require('mysql');

var db = mysql.createConnection({
  /* host: "91.216.107.184",
  user: "ephey1699662_1sgjq6",
  password: "pnceeovfaw",
  database:"ephey1699662_1sgjq6" */

  host: "localhost",
  user: "root",
  password: "",
  database:"epheynix_db"
});

db.connect(function(err) {
  if (err);
  console.log("Connecté Wahou!");
});


