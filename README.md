# Bamazon

## About

Bamazon is a barebones version of the average store retail system that allows
i. Customers to purchase goods online
ii. Store managers to manage their inventory
iii. Store supervisors to view the sales performance of goods by department

## Technologies

Bamazon is a
i. node-only retail store system that takes commands from all parties
ii. through prompts (inquirer) and
iii. stores the impact of commands executed on inventory and sales in a mysql database.

## Instructions

There are three modules involved in the construction of Bamazon. And they are the Customer, Manager and Supervisor modules. In order to display the full functionality of the modules, a database of 10 retail items have already been created in the my sql database which contains the following data:
i. item_id
ii. product_name
iii. department_name
iv. price (retail)
v. stock_quantity

Instructions for creating the corresponding bamazon database in mysql is contained within Bamazon-Schema.sql and the corresponding initial 10 item data is within the Bamazon-Seeds.sql.

All the following instructions are to be executed via terminal with node.js and mysql installed and connected.

### 1. Customers:

- `node bamazonCustomer`

- Executing this command will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

- This is followed by two prompts for the user:

  - The first should ask them the ID of the product they would like to buy.
  - The second message should ask how many units of the product they would like to buy.

- The second message would use the answers provided to locate the item_id from the bamazon database in mysql and check if there is enough quantity to fulfill the order.
  - If sufficient, order will go through
    User would be notified of the price of the purchase and in mysql:
    i. the inventory of the corresponding item will be reduced and
    ii. the sale will be recorded.
    <img src="gif/saleSuccess.gif">
  - If insufficient, user would be notified
    User is then given a chance to adjust their quantity for the same item or offered to return to the main menu.
    <img src="gif/saleFail.gif">
    <img src="gif/saleRecorded.gif">

### 2. Managers:

- `node bamazonManager`

  - Running this application will:

  * List a set of menu options:

    - View Products for Sale
    - View Low Inventory
    - Add to Inventory
    - Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
    <img src="gif/viewProducts.gif">

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
    <img src="gif/viewLow.gif">

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    <img src="gif/addInventory.gif">

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
    <img src="gif/addProduct.gif">

### 3. Supervisors:

- `node bamazonSupervisor`

  - Running this application will list a set of menu options:

  * View Product Sales by Department
  * Create New Department

- When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window.

<img src="gif/viewSales.gif">

- The supervisor also has the ability create a new department via the console, which can pick up any existing product sales related to that department created.

<img src="gif/newDept.gif">

## Link to Deployment

- Not Applicable as this can only be run from Node
