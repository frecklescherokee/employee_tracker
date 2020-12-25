/ require mysql and console.table and inquirer
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
///////////// delete later because we don't want ASCII //////////////////
const figlet = require("figlet");

// make arrays to hold the various stuff we need for this app
const departmentsArr = [];
const employeesArr = [];
const rolesArr = [];
/////////////// delete later cause managers should just be in the employees table ////////////////////
const managersArr = [];

let business = 'employee tracker'