INSERT INTO departments (name)
VALUES 
("Systems"), 
("Fab Engineering"), 
("Manufacturing"), 
("Facilities");

INSERT INTO roles (title, department_id, salary)
VALUES 
("Director of Systems", 1, 250000),
("Director of Manufacturing", 3, 250000),
("Director of Fab Engineering", 3, 250000),
("Director of Facilities", 4, 250000),
("Manager of Systems", 1, 200000),
("Manager of Fab Engineering", 2, 200000),
("Shift Manager", 3, 150000),
("Manager of Facilities", 4, 200000),
("Systems Engineer", 1, 95000),
("Equipment Engineer", 2, 95000),
("Manufacturing Engineer", 3, 95000),
("Facilities Engineer", 4, 95000),
("Systems Staff Engineer", 1, 140000),
("Fab Eng Staff Engineer", 2, 140000),
("Equipment Technician", 2, 60000),
("Process Technician", 2, 60000),
("Specialist", 3, 45000);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
("Michelle", "Teacup", 1),
("Marcus", "Golfbag", 2),
("Marty", "Theory", 6),
("Jonah", "Neff", 14),
("Jesse", "Overstreet", 6),
("Ray", "Ching", 11),
("Victor", "Anchovies", 7),
("Collin", "Cooper", 15),
("Freckles", "Cherokee", 13),
("Paula", "Nest", 9);


UPDATE employees SET manager_id = 3 WHERE id = 4;
UPDATE employees SET manager_id = 1 WHERE id = 5;
UPDATE employees SET manager_id = 2 WHERE id = 6;
UPDATE employees SET manager_id = 2 WHERE id = 7;
UPDATE employees SET manager_id = 9 WHERE id = 8;
UPDATE employees SET manager_id = 5 WHERE id = 9;
UPDATE employees SET manager_id = 9 WHERE id = 10;