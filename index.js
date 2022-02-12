const mysql = require('mysql2/promise')
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        //
        user: 'root',
        // password
        password: 'Loseyourselftodance10101',
        database: 'workforce'
    },
    console.log('connected to Workforce database')
);


// DISPLAY SQL queries
var getEmployee = () => {
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
};

var getDepartment = () => {
    db.query(
    `SELECT id AS Department_ID, name as Department_Name
     FROM department`, 
        function(err, results, fields) {
            console.table(results);
            console.log('departments');
        }
    )
};

var getRoles = () => {
    db.query(
        `SELECT roles.id AS Role_ID , roles.title as Title, roles.salary AS Salary, department.name AS Department_name
        FROM roles
        JOIN department ON roles.department_id = department.id;`, 
        function(err, results, fields) {
            console.table(results);
        }
    )
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
    }
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
    }
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
    }
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
function userInput(){
    var staffSize = 0;
    console.log(`
   ||=======================================================================||
     Welcome!  
   ||=======================================================================||
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Please enter the team manager's name:",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your team manager's name!")
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: "Please enter the manager's ID:",
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter the manager's ID!"
            )
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "Please enter your manager's email address:",
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log("Please enter your manager's email address!")
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Please enter your manager's office number:",
        validate: officeNumberInput => {
          if (officeNumberInput) {
            return true;
          } else {
            console.log("Please enter your manager's office number!")
            return false;
          }
        }
      },
    ])
    .then (({name, id, email, officeNumber}) => {
        staff.push(new Manager(name, id, email, officeNumber));
        console.log(name);
        restOfStaff();
      })
};


const userMenu = () => {
    const questions = [
      {
        type: "list",
        name: "promptAnswer",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update an Employee Role", "Done/Exit"],
      }
    ];
    return inquirer.prompt(questions);
  };

  const exitProgram = () =>{
    console.log('Bye! :D');
}


const fuctionCycler = async () => {
    await userMenu()
  .then(answers => {
    if (answers.employeeType ===  "View All Departments"){
        getDepartment();
    }
    if (answers.employeeType ===  "View All Roles"){
        getRoles();
    }
    if (answers.employeeType ===  "View All Employees"){
        getEmployee();
    }
    if (answers.employeeType ===  "Add A Department"){
        addDepartment();
    }
    if (answers.employeeType ===  "Add A Role"){
        addRole();
    }
    if (answers.employeeType ===  "Add An Employee"){
        addEmployee();
    }
    if (answers.employeeType ===  "Update an Employee Role"){
        UpdateEmployee();
    }
    if (answers.employeeType ===  "Done/Exit") {
        exitProgram();
    }
  })
  }  


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

fuctionCycler();