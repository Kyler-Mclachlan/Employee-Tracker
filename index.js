const mysql = require('mysql2');
const cTable = require('console.table');

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


var getEmployee = () => {
    db.query(
        // Still need to do manager name
    `SELECT employees.id AS Employee_ID , employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title as Title, department.name AS Department_name, roles.salary AS Salary
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    RIGHT JOIN department ON roles.department_id = department.id;`,
    
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

getEmployeetest();
// getEmployee();