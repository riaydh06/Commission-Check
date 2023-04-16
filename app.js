const fs = require("fs");
const Operation = require("./src/operation");
const User = require("./src/user");

fs.readFile(process.argv[2], "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  let operations = JSON.parse(jsonString);
  let users = [];

  operations.map((operation) => {
    let op = new Operation(operation);
    let user = users.filter((user) => user.id === op.user_id);
    if (user.length > 0) {
      user = user[0];
    } else {
      user = new User(op.user_id, op.user_type);
      users.push(user);
    }
    user.calculate(op);
  });
});
