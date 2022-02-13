const mysql = require('mysql2/promise')
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./config/connection');


addEmployeeEntry = async () => { 
    return inquirer.prompt([
    {
      type: "input",
      name: "employeeFirstName",
      message: "What is your employees First name?",
    },
    {
        type: "input",
        name: "employeeLastName",
        message: "What is your employees Last name?",
    },
    {
        type: "input",
        name: "employeeRole",
        message: "What is your employees Role ID?",
    },
    {
        type: "input",
        name: "employeeManager",
        message: "What is your employees Manager ID?",
    }
  ])
  .then (({employeeFirstName, employeeLastName, employeeRole, employeeManager}) => {
    const newEmployeedata = {employeeFirstName, employeeLastName, employeeRole, employeeManager};
    addEmployee(newEmployeedata)
  })
}

// DISPLAY SQL queries
var getEmployee= async () => {
    db.query(
        // Still need to do manager name
    `SELECT employees.id AS Employee_ID , employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title as Title, department.name AS Department_name, roles.salary AS Salary, employees.manager_id AS Manager_id
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    RIGHT JOIN department ON roles.department_id = department.id
    ORDER BY employees.id ASC;`,
    
        function(err, results, fields) {
            console.table(results);
            if (err){
                console.log(err);
            }
        }
    )
    userMenu();
};

var getDepartment = async () => {
    db.query(
    `SELECT id AS Department_ID, name as Department_Name
     FROM department`, 
        function(err, results, fields) {
            console.table(results);
            console.log('departments');
            if (err){
                console.log(err)
            };
        }
    )
    userMenu();
};

var getRoles = async () => {
    db.query(
        `SELECT roles.id AS Role_ID , roles.title as Title, roles.salary AS Salary, department.name AS Department_name
        FROM roles
        JOIN department ON roles.department_id = department.id;`, 
        function(err, results, fields) {
            console.table(results);
        }
    )
    userMenu();
};





// ADD SQL queries
var addEmployee = (data) => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
    db.query(sql, params, (err, results) => {
        console.table(results);
        if (err){
            console.log(err);
        }
    },
    userMenu()
)};

var addRole = (data) => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [data.title, data.salary, data.department_id];
    db.query(sql, params, (err, results) => {
        console.table(results);
        if (err){
            console.log(err);
        }
    }
)};

var addDepartment = (data) => {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const params = [data.name];
    db.query(sql, params, (err, results) => {
        console.table(results);
        if (err){
            console.log(err);
        }
    },
    userMenu()
)};

// Update SQL queries 
var UpdateEmployee = (data) => {
    const sql = `UPDATE employees SET role_id = ?
                WHERE first_name = ?`
    const params = [data.role_id, data.first_name];
    db.query(sql, params, (err, results) => {
        console.table(results);
        if (err){
            console.log(err);
        }
    },
    userMenu()
)};

// TEST functions
var getEmployeetest = () => {
    db.query(
        // Still need to do manager name
    `SELECT *
    FROM employees
    INNER JOIN employees ON employees.manager_id = employees.id;`,
    
        function(err, results, fields) {
            console.table(results);
            if (err){
                console.log(err);
            }
        }
    )
};

var getEmployeetestmyversion = () => {
    db.query(
        // Still need to do manager name
    `SELECT *
    FROM employees
    inner join employees as managers on employees.manager_id = managers.id;`,
    
        function(err, results, fields) {
            console.table(results);
            if (err){
                console.log(err);
            }
        }
    )
};

//Inquirer 

const exitProgram = () =>{
    console.log('Bye! :D');
}

const userMenu = async () => {
    return inquirer.prompt([
      {
        type: "list",
        name: "promptAnswer",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update an Employee Role", "Done/Exit"],
      }
    ])
    .then(answers => {
    if (answers.promptAnswer ===  "View All Departments"){
        getDepartment();
    }
    if (answers.promptAnswer ===  "View All Roles"){
        getRoles();
    }
    if (answers.promptAnswer ===  "View All Employees"){
        getEmployee();
    }
    if (answers.promptAnswer ===  "Add A Department"){
        addDepartment();
    }
    if (answers.promptAnswer ===  "Add A Role"){
        addRole();
    }
    if (answers.promptAnswer ===  "Add An Employee"){
        addEmployeeEntry();
    }
    if (answers.promptAnswer ===  "Update an Employee Role"){
        UpdateEmployee();
    }
    if (answers.promptAnswer ===  "Done/Exit") {
        exitProgram();
    }
  })
  };





  // TEST DATA

var employeeTestData = {
    first_name : 'Kyler',
    last_name : 'Mclachlan',
    role_id : 2,
    manager_id : 2
}

var roleTestData = {
    title: 'Astroid Farmer',
    salary : '50000',
    department_id : 2
}


var departmentTestData = {
    name: 'Lab of Secrets'
}

var updateRoleTestData = {
    role_id: 4,
    first_name: 'Kyler'
}
// addEmployee(employeeTestData);
// getEmployee();
// addRole(roleTestData);
// getRoles();
// addDepartment(departmentTestData);
// getDepartment();
// UpdateEmployee(updateRoleTestData);
// getEmployee();

userMenu();