USE bamazon;

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Coffee Machine", "Small Appliances", 648.00, 10),
    ("Fridge", "White Goods", 727.00, 3),
    ("Washing Machine", "White Goods", 684.00, 5),
    ("iPad", "Electronics", 469.00, 15),
    ("Laptop", "Electronics", 959.00, 8),
    ("Toaster", "Small Appliances", 55.00, 7),
    ("Fan Heater", "Small Appliances", 18.00, 22),
    ("Air Conditioner", "White Goods", 828.00, 2),
    ("Printer", "Electronics", 197.00, 6),
    ("UHD TV", "Electronics", 1395.00, 5)

/* starting data for sales */

UPDATE products SET product_sales=2592.00 WHERE item_id=1;
UPDATE products SET product_sales=1368.00 WHERE item_id=3;
UPDATE products SET product_sales=4690.00 WHERE item_id=4;
UPDATE products SET product_sales=7672.00 WHERE item_id=5;
UPDATE products SET product_sales=220.00 WHERE item_id=6;
UPDATE products SET product_sales=360.00 WHERE item_id=7;
UPDATE products SET product_sales=828.00 WHERE item_id=8;
UPDATE products SET product_sales=394.00 WHERE item_id=9;
UPDATE products SET product_sales=1275.00 WHERE item_id=11;
UPDATE products SET product_sales=3225.00 WHERE item_id=12;

