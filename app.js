const fs = require("fs");
const Operation = require("./src/operation");
const User = require("./src/user");

/** Read json file */
fs.readFile(process.argv[2], "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  /** Perse the data into json format  */
  let operations = JSON.parse(jsonString);
  /** Creating initial empty user list  */
  let users = [];

  /** Iterating every operation  */
  operations.map((operation) => {
    /** Create an instance of operation  */
    let op = new Operation(operation);
    /** Filtering existing user  */
    let user = users.filter((user) => user.id === op.user_id);
    if (user.length > 0) {
      user = user[0];
    } else {
      /** Create an instance of user  */
      user = new User(op.user_id, op.user_type);
      users.push(user);
    }
    /** Calculate commission  */
    user.calculate(op);
  });
});
