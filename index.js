// require mysql and console.table and inquirer
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// make arrays to hold the various questions we need for this app
const departmentsArr = [];
const employeesArr = [];
const rolesArr = [];

// ENTER THE NAME OF YOUR COMPANY
let company_name = 'SAMSUNG AUSTIN SEMICONDUCTOR';


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

// connect to the DB
con.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
});

// print the name of the program
let whenConnected = (res, rej) => {
    // call the SQL queries for the various tables' data and pushes it into the arrays declared above
    queryArrays();
    
    // send a response back to the promise
    res("yay!");

    // print out the company name and 'employee tracker'
    console.log ("");
    console.log (company_name);
    console.log ("employee tracker");
    console.log ("");
};