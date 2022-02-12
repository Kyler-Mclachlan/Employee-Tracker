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

(initateDatabase) =>{
    db.db.source 
}

var getEmployee = () => {
    db.query(
    `SELECT * FROM employees;`, 
        function(err, results, fields) {
            console.table(results);
        }
    )
};

var getDepartment = () => {
    db.query(
    `SELECT * FROM department;`, 
        function(err, results, fields) {
            console.table(results);
        }
    )
};

var getRoles = () => {
    db.query(
    `SELECT * FROM roles;`, 
        function(err, results, fields) {
            console.table(results);
        }
    )
};

  
getRoles();