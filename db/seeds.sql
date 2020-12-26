INSERT INTO employees (first_name, last_name, role_id)
VALUES
("Michelle", "Teacup", 1),
("Marcus", "Golfbag", 3),
("Marty", "Theory", 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Jonah", "Neff", 14, 3),
("Jesse", "Overstreet", 6, 1),
("Ray", "Ching", 11, 2),
("Victor", "Anchovies", 7, 2),
("Collin", "Cooper", 15, 9),
("Freckles", "Cherokee", 13, 5),
("Paula", "Nest", 9, 9);


INSERT INTO roles (title, department_id, salary)
VALUES 
("Director", 1, 250000),
("Director", 2, 250000),
("Director", 3, 250000),
("Director", 4, 250000),
("Manager", 1, 200000),
("Manager", 2, 200000),
("Shift Manager", 3, 150000),
("Manager", 4, 200000),
("Systems Engineer", 1, 95000),
("Equipment Engineer", 2, 95000),
("Manufacturing Engineer", 3, 95000),
("Facilities Engineer", 4, 95000),
("Staff Engineer", 1, 140000),
("Staff Engineer", 2, 140000),
("Equipment Technician", 2, 60000),
("Process Technician Technician", 2, 60000),
("Specialist", 3, 45000);

INSERT INTO departments (name)
VALUES 
("Systems"), 
("Fab Engineering"), 
("Manufacturing"), 
("Facilities");