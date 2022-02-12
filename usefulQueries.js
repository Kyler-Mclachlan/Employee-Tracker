


Employees
// `SELECT * FROM employees
// LEFT JOIN roles ON employees.role_id = roles.id;`

// // `SELECT first_name, last_name FROM employees;`

`SELECT employees.first_name, employees.last_name, employees.manger_id, roles.title, roles.salary, roles.department_id
