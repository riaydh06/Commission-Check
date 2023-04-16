const Commission = require("./commission");

it("Commission", () => {
  const obj = new Commission("cash_in", "0.5", null, 100, null);
  expect(obj.type).toBe("cash_in");
  expect(obj.percent).toBe("0.5");
  expect(obj.maxLimit).toBe(null);
  expect(obj.minLimit).toBe(100);
  expect(obj.weekLimit).toBe(null);
});
