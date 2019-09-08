var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  startInquirer();
});

function startInquirer() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          displayItems();
          break;
        case "View Low Inventory":
          reviewLow();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function displayItems() {
  var query =
    "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res) {
    console.table(res);
    startInquirer();
  });
}

function reviewLow() {
  var query =
    "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <5";
  connection.query(query, function(err, res) {
    console.table(res);
    startInquirer();
  });
}

function addInventory() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    promptInfo(res.length);
  });
}

function promptInfo(itemLength) {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What item number are you interested in adding?",
        validate: function(value) {
          if (parseInt(value) > 0 && parseInt(value) <= itemLength) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "number",
        message: "How many units of the item?"
      }
    ])
    .then(function(answer) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      connection.query(query, { item_id: answer.item }, function(err, res) {
        var currentQuantity = res[0].stock_quantity;
        var newQuantity = currentQuantity + answer.quantity;
        addItem(answer.item, newQuantity);
      });
    });
}

function addItem(itemID, newQuantity) {
  var update = "UPDATE products SET ? WHERE ?";
  connection.query(
    update,
    [{ stock_quantity: newQuantity }, { item_id: itemID }],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!");
    }
  );
  startInquirer();
}

function addProduct() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Product name?"
      },
      {
        name: "department",
        type: "input",
        message: "Which department?"
      },
      {
        name: "price",
        type: "number",
        message: "Sale price?"
      },
      {
        name: "quantity",
        type: "number",
        message: "Quantity?"
      }
    ])
    .then(function(answer) {
      var update = "INSERT INTO products SET ?";
      connection.query(
        update,
        {
          product_name: answer.name,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!");
        }
      );
      startInquirer();
    });
}
