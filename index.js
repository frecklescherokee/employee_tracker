// require mysql and console.table and inquirer
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// make arrays to hold the various questions we need for this app
const departmentsArray = [];
const employeesArray = [];
const rolesArray = [];

// ENTER THE NAME OF YOUR COMPANY
let company_name = 'SAMSUNG AUSTIN SEMICONDUCTOR';

// Create a connection to the DB
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // mysql username
    user: "root",
    // mysql password
    password: "12qw!@QW",
    database: "company"
  });

// connect to the DB
connection.connect(function(err) {
    if (err) throw err;
});

// executes whatever function user chooses in opening menu
// (data) comes from (answers) given in main menu in questionList() function
const options = (data) => {
    let con = true;
    switch (data.menuOptions) {
      // if user chooses to List Employees, call getEmployees()
      case "List Employees":
        getEmployees();
        break;
      // if user chooses to List Departments, call getDepartments()
      case "List Departments":
        getDepartments();
        break;
      // if user chooses to List Roles, call getRoles()
      case "List Roles":
        getRoles();
        break;
      // if user chooses to Enter New Department, call enterNewDepartment()
      case "Enter New Department":
        enterNewDepartment(data);
        break;
      // if user chooses to Enter New Role, call enterNewRole()
      case "Enter New Role":
        enterNewRole(data);
        break;
      // if user chooses to Enter New Employee, call enterNewEmployee()
      case "Enter New Employee":
        enterNewEmployee(data);
        break;
      // if user chooses to Change Employee's Role, call updateEmployee()
      case "Change Employee's Role":
        updateEmployee(data)
        break;
      // if user chooses to Exit, set "con" = false
      case "Exit":
        con = false;
        break;
    }
    // if user doesn't choose to continue, exit program with message "See you later"
    if (!con) {
      console.log("See you later!");
      process.exit(0);
    } else {
      setTimeout(()=> {
      // ask user if they want to continue or not
        inquirer.prompt([
        {
          type: "confirm",
          name: "continue",
          message: "Would you like to continue?",
          default: true
        }
      ])
      .then(answer => {
        // if user chooses to continue, call begin() again to show main menu
        if (answer.continue == true) {
          return begin()
        } 
        // if user chooses to Exit, exit program and say "program over"
        else {
          console.log("program over");
          process.exit(0)
        }
      })
    }, 500);
    }
};

// shows main menu then has all subsequent questions from each menu choice
// calls the options() function at the end, passing the (answers)
let questionList = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "menuOptions",
          message: "Choose from the below options:",
          choices: [
            "List Departments",
            "List Roles",
            "List Employees",
            "Enter New Department",
            "Enter New Role",
            "Enter New Employee",
            "Change Employee's Role",
            "Exit",
          ],
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of this new department?",
            when: function (data) {
              if (data.menuOptions == "Enter New Department") {
                return true;
              } else {
                return false;
              }
            },
        },
        {
          type: "input",
          name: "role",
          message: "What is the name of this new role?",
          when: function (data) {
            if (data.menuOptions == "Enter New Role") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "list",
          name: "department",
          message: "Select a department for this new role below:",
          choices: departmentsArray,
          when: function (data) {
            if (data.menuOptions == "Enter New Role") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this new role?",
          when: function (data) {
            if (data.menuOptions == "Enter New Role") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "input",
          name: "first_name",
          message: "What is this new employee's first name?",
          when: function (data) {
            if (data.menuOptions == "Enter New Employee") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "input",
          name: "last_name",
          message: "What is this new employee's last name?",
          when: function (data) {
            if (data.menuOptions == "Enter New Employee") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "list",
          name: "role",
          message: "Select a role for this new employee from the list below:",
          choices: rolesArray,
          when: function (data) {
            if (data.menuOptions == "Enter New Employee") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "list",
          name: "manager",
          message: "Select a manager for this new employee from the list below:",
          choices: employeesArray,
          when: function (data) {
            if (data.menuOptions == "Enter New Employee") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "list",
          name: "employee",
          message: "Select an employee from the list below for a role change:",
          choices: employeesArray,
          when: function (data) {
            if (data.menuOptions == "Change Employee's Role") {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          type: "list",
          name: "new_role",
          message: "Select new role from the list below:",
          choices: rolesArray,
          when: function (data) {
            if (data.menuOptions == "Change Employee's Role") {
              return true;
            } else {
              return false;
            }
          },
        },
      ])
      // send answers to the "options" function, 
      // which uses a switch statement to see what choice was made
      // then call a function to execute that choice
      .then((answers) => options(answers))
      .catch((err) => console.log(err));
};
  
// queries all SQL tables and adds info to arrays to facilitate asking questions
const makeQuestionOptionArrays = () => {
    connection.query(`SELECT title
    FROM roles
    ORDER BY id ASC
    `, (err, rows) => {
      if (err) throw err;
      rows.map((element) => {
        rolesArray.push(element.title);
      });
    });
    connection.query(`SELECT * FROM departments`, (err, rows) => {
      if (err) throw err;
      rows.map((element) => {
        departmentsArray.push(element.name);
      });
    });
    connection.query(`SELECT first_name, last_name FROM employees`, (err, rows) => {
      if(err) throw err;
      rows.map((element) => {
        employeesArray.push(`${element.first_name} ${element.last_name}`)
      });
    })
};

// SQL code to GET DEPARTMENTS
let getDepartments = () => {
    connection.query('SELECT * FROM departments', (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
};

// SQL code to GET ROLES
let getRoles = () => {
    connection.query(
        `SELECT roles.id, roles.title, roles.salary, departments.name
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id`,
        (err, rows) => {
        if (err) throw err;
        console.table(rows);
        }
    );
};

// SQL code to GET EMPLOYEES
let getEmployees = () => {
    connection.query(
        `SELECT E.ID, E.FIRST_NAME, E.LAST_NAME, R.TITLE, D.NAME AS dept, R.SALARY, M.FIRST_NAME AS manager_first, M.LAST_NAME AS manager_last
        FROM EMPLOYEES E
        left JOIN ROLES R ON E.ROLE_ID = R.ID
        left JOIN DEPARTMENTS D ON R.DEPARTMENT_ID = D.ID
        left JOIN EMPLOYEES M ON E.MANAGER_ID = M.ID`,
        (err, rows) => {
        if (err) throw err;
        console.table(rows);
        }
    );
};
  
// SQL code to Enter New Department
let enterNewDepartment = (data) => {
    connection.query(
        `INSERT INTO departments (name) VALUES (?)`,
        [data.name],
        (err, rows) => {
        if (err) throw err;
        console.table(rows);
        }
    );
};

// SQL code to Enter New Role
let enterNewRole = (data) => {
    let departmentId = departmentsArray.indexOf(data.department) + 1;
    connection.query(
        `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)`,
        [data.role, departmentId, parseInt(data.salary)],
        (err, rows) => {
        if (err) throw err;
        console.table(rows);
        }
    );
    rolesArray.push(data.name);
};
  
// SQL code to Enter New Employee
let enterNewEmployee = (data) => {
    let roleId = rolesArray.indexOf(data.role) + 1;
    let managerId = employeesArray.indexOf(data.manager) + 1;

    connection.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
        [data.first_name, data.last_name, roleId, managerId],
        (err, rows) => {
        if (err) throw err;
        console.table(rows);
        }
    );
};

// SQL code to UPDATE EMPLOYEE ROLE
let updateEmployee = (data) => {
    employeeId = employeesArray.indexOf(data.employee) +1;
    roleId = rolesArray.indexOf(data.new_role) + 1;
    connection.query(`UPDATE employees SET role_id = ? WHERE employees.id = ?`, 
    [roleId, employeeId], 
    (err, rows) => {
        if (err) throw err;
        console.table(rows);
        }
    );
};

// print the name of the program and fill arrays with options for questions
let whenConnected = (res, rej) => {
    // call the SQL queries for the various tables' data and push the data
    // it into the arrays declared above
    makeQuestionOptionArrays();
    
    // send a response back to the promise
    res("yay!");
    rej(err);

    // print out the company name and 'employee tracker'
    console.log ("");
    console.log (company_name);
    console.log ("employee tracker");
    console.log ("");
};
    
  // calls the 'questionList' function using a promise (whenConnected)
  let begin = () => {
    new Promise(whenConnected).then(questionList).catch((error) => {
      console.log(error);
    });
  };
  
  begin();