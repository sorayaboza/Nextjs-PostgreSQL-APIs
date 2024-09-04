CREATE DATABASE my_database;


-- Connect to the newly created database
\c my_database;


-- Create the products table
CREATE TABLE my_table(
    id SERIAL PRIMARY KEY,
    description TEXT,
    category TEXT
);


INSERT INTO my_table (description, category)
VALUES
    ('Item 1 description', 'Category A'),
    ('Item 2 description', 'Category B'),
    ('Item 3 description', 'Category C');

-- DROP DATABASE my_database