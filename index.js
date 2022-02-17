const mysql = require('mysql2/promise')
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./config/connection');


// Prompts for collecting data
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
    const newEmployeedata = { first_name : employeeFirstName,  last_name : employeeLastName, role_id: employeeRole, manager_id: employeeManager};
    addEmployee(newEmployeedata)
  })
}

addDepartmentEntry = async () => { 
    return inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the department's name?",
    },
  ])
  .then (({departmentName}) => {
    const newDepartmentdata = { name : departmentName};
    addDepartment(newDepartmentdata)
  })
}

addRoleEntry = async () => { 
    return inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?",
          },
          {
              type: "input",
              name: "roleSalary",
              message: "What is the role's salary?",
          },
          {
              type: "input",
              name: "roleDepartment",
              message: "What department does the role belong to?",
          }
  ])
  .then (({roleTitle, roleSalary, roleDepartment}) => {
    const newRoleData = { title : roleTitle, salary: roleSalary, department_id : roleDepartment };
    addRole(newRoleData)
  })
}

UpdateRoleEntry = async () => { 
    const employees = await getEmployeeForUpdate()
    console.log(employees);
    return inquirer.prompt([
        {
            type: "list",
            name: "originalRole",
            message: "What is the name of the employee whose role is changing?",
            choices: [employees],
          },
          {
              type: "input",
              name: "newRole",
              message: "What is the id of the new role",
          }
  ])
  .then (({roleTitle, roleSalary, roleDepartment}) => {
    const newRoleData = { title : roleTitle, salary: roleSalary, department_id : roleDepartment };
    addRole(newRoleData)
  })
}

// DISPLAY SQL queries
var getEmployee= async () => {
    db.query(
    `SELECT employees.id AS ID, employees.first_name AS First_name, employees.last_name as Last_Name, roles.title AS Title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employees 
    LEFT JOIN roles on employees.role_id = roles.id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employees manager on manager.id = employees.manager_id;`,
        function(err, results, fields) {
            console.table(results);
            userMenu();
            if (err){
                console.log(err);
            }
        }
    )
};


var getEmployeeForUpdate = async () => {
    return new Promise((resolve, reject) =>{
        db.query(
        `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name
        FROM employees;`, function(err, results) {
            if(err) reject(err)
            userMenu();
            resolve(results);
        }       
        )
        
    }) 
};

var getDepartment = async () => {
    db.query(
    `SELECT id AS Department_ID, name as Department_Name
     FROM department`, 
        function(err, results, fields) {
            console.table(results);
            console.log('departments');
            userMenu();
            if (err){
                console.log(err)
            };
        }
    )
};

var getRoles = async () => {
    db.query(
        `SELECT roles.id AS Role_ID , roles.title as Title, roles.salary AS Salary, department.name AS Department_name
        FROM roles
        JOIN department ON roles.department_id = department.id;`, 
        function(err, results, fields) {
            console.table(results);
            userMenu();
            if (err){
                console.log(err)
            };
        }
    )
};





// ADD SQL queries
var addEmployee = async (data) => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
    db.query(sql, params, (err, results) => {
        console.table(results);
        userMenu()
        if (err){
            console.log(err);
        }
    },
)};

var addRole = async  (data) => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [data.title, data.salary, data.department_id];
    db.query(sql, params, (err, results) => {
        console.table(results);
        userMenu()
        if (err){
            console.log(err);
        }
    },
)};

var addDepartment = async (data) => {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const params = [data.name];
    db.query(sql, params, (err, results) => {
        console.table(results);
        userMenu()
        if (err){
            console.log(err);
        }
    },
)};

// Update SQL queries 
var UpdateEmployee = (data) => {
    const sql = `UPDATE employees SET role_id = ?
                WHERE first_name = ?`
    const params = [data.role_id, data.first_name];
    db.query(sql, params, (err, results) => {
        console.table(results);
        userMenu()
        if (err){
            console.log(err);
        }
    },
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
        addDepartmentEntry();
    }
    if (answers.promptAnswer ===  "Add A Role"){
        addRoleEntry();
    }
    if (answers.promptAnswer ===  "Add An Employee"){
        addEmployeeEntry();
    }
    if (answers.promptAnswer ===  "Update an Employee Role"){
        UpdateRoleEntry();
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