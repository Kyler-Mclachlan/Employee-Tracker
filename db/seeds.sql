INSERT INTO department (name)
VALUES
('Engineering'),
('Astro-Herbologly'),
('Terraforming'),
('Goo-Analytics');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sr Hyper-Materialist', 500000, 1),
('Sr Water Farmer', 300000, 2),
('Sr Gravity Warper', 100000, 3),
('Sr Goo Analyst', 200000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Adam', 'Young', 1, NULL),
('Spruce', "Telos", 2, NULL),
('Margon', 'Cull', 3, NULL),
('Daisy', 'Beloo', 4, NULL);