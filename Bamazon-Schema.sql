DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50),
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT  
);

CREATE TABLE departments (
  department_id INT PRIMARY KEY NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs DECIMAL(10,2)  
);

