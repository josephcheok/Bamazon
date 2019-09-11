var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayItems();
});

function displayItems() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function(err, res) {
    console.table(res);
    startInquirer(res.length); //passing number of items for use in validation of itemID
  });

  //--------------------Inquirer SUB-functions--------------------------------------
  function reorder(itemID) {
    inquirer
      .prompt({
        name: "quantity",
        type: "number",
        message: "How many units of the item?"
      })
      .then(function(answer) {
        query = "SELECT stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: itemID }, function(err, res) {
          if (answer.quantity > res[0]) {
            console.log("Insufficient quantity!");
            nextAction();
          } else {
            var newQuantity = res[0].stock_quantity - answer.quantity;
            letOrder(itemID, answer.quantity, newQuantity);
          }
        });
      });
  }

  function letOrder(itemID, orderQuantity, newQuantity) {
    var update = "UPDATE products SET ? WHERE ?";
    connection.query(
      update,
      [{ stock_quantity: newQuantity }, { item_id: itemID }],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product(s) updated!");
        console.log("Order confirmed! ");
      }
    );
    query = "SELECT price, product_sales FROM products WHERE ?";
    connection.query(query, { item_id: itemID }, function(err, res) {
      var sale = orderQuantity * res[0].price;
      var productSales = sale + res[0].product_sales;
      console.log("Cost of your purchase is: " + sale);
      updateSales(itemID, productSales);
    });
  }

  function updateSales(itemID, productSales) {
    update = "UPDATE products SET ? WHERE ?";
    connection.query(
      update,
      [{ product_sales: productSales }, { item_id: itemID }],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " sale(s) recorded!");
        nextAction2();
      }
    );
  }

  function nextAction(itemID) {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Change order quantity", "Go back to item list", "Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Change order quantity":
            reorder(itemID);
            break;
          case "Go back to item list":
            displayItems();
            break;
          case "Exit":
            goodbye();
            break;
        }
      });
  }

  function nextAction2() {
    inquirer
      .prompt({
        name: "action2",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Go back to item list", "Exit"]
      })
      .then(function(answer) {
        switch (answer.action2) {
          case "Go back to item list":
            displayItems();
            break;
          case "Exit":
            goodbye();
            break;
        }
      });
  }

  function goodbye() {
    console.log("Goodbye!");
  }
  //----------------END of Inquirer SUB-functions---------------------------

  function startInquirer(itemLength) {
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What item number are you interested in buying?",
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
        query = "SELECT stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.item }, function(err, res) {
          console.log(res);
          if (answer.quantity > res[0].stock_quantity) {
            console.log("Insufficient quantity!");
            nextAction(answer.item);
          } else {
            var newQuantity = res[0].stock_quantity - answer.quantity;
            letOrder(answer.item, answer.quantity, newQuantity);
          }
        });
      });
  }
}
