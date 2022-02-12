INSERT INTO department (name)
VALUES
('Engineering'),
('Astro-Herbologly'),
('Terraforming'),
('Goo-Analytics');

INSERT INTO roles (title, salary, department_id)
VALUES
('Senior Hyper-Materialist', 500000, 1),
('Senior Water Farmer', 300000, 2),
('Senior Gravity Warper', 100000, 3),
('Senior Goo Analyst', 200000, 4),
('Hyper-Materialist', 500000, 1),
('Water Farmer', 300000, 2),
('Gravity Warper', 100000, 3),
('Goo Analyst', 200000, 4);;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Adam', 'Young', 1, NULL),
('Spruce', "Telos", 2, NULL),
('Margon', 'Cull', 3, NULL),
('Daisy', 'Beloo', 4, NULL),
('Henry', 'Calo', 5, 1),
('Fae', 'Tallow', 6, 2),
('Fate', 'Night', 7, 3),
('Mayeem', 'Denu', 8, 4);