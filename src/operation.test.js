const Operation = require("./operation");

it("Operation", () => {
  const obj = new Operation({
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: { amount: 200.0, currency: "EUR" },
  });
  expect(obj.date).toBe("2016-01-05");
  expect(obj.user_id).toBe(1);
  expect(obj.user_type).toBe("natural");
  expect(obj.type).toBe("cash_in");
  expect(obj.operation).toEqual({ amount: 200.0, currency: "EUR" });
});
