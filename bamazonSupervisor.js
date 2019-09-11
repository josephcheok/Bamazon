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
      choices: ["View Product Sales by Department", "Create New Department"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          viewSales();
          break;
        case "Create New Department":
          createDept();
          break;
      }
    });
}

function viewSales() {
  // var query =
  //   "SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));";
  var query =
    "SELECT d.department_id, p.department_name, SUM(p.product_sales) AS product_sales, d.over_head_costs,";
  query +=
    "(SUM(p.product_sales) - d.over_head_costs) as total_profit FROM products AS p INNER JOIN ";
  query +=
    "departments AS d ON p.department_name = d.department_name GROUP BY p.department_name, d.department_id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function createDept() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter department name"
      },
      {
        name: "overhead",
        type: "number",
        message: "Input overhead costs"
      }
    ])
    .then(function(answer) {
      var update = "INSERT INTO departments SET ?";
      connection.query(
        update,
        {
          department_name: answer.name,
          over_head_costs: answer.overhead
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " record(s) inserted!");
        }
      );
    });
}
