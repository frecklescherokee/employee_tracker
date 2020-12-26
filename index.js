// require mysql and console.table and inquirer
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");


// Create a connection to the DB
const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // mysql username
    user: "root",
    // mysql password
    password: "12qw!@QW",
    database: "company"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

