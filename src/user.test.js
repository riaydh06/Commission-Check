const User = require("./user");

it("User", () => {
  const obj = new User(1, "natural");
  expect(obj.id).toBe(1);
  expect(obj.user_type).toBe("natural");
});

describe("When cash in", () => {
  it("Should amount zero", () => {
    const user = new User(1, "natural");
    const amount = user.calculateThisWeekAmount("2016-01-05", "cash_in");
    expect(amount).toBe(0);
  });
  it("Should amount zero", () => {
    const user = new User(1, "juridical");
    const amount = user.calculateThisWeekAmount("2016-01-09", "cash_in");
    expect(amount).toBe(0);
  });
});

describe("When cash out", () => {
  it("Should amount zero", () => {
    const user = new User(1, "natural");
    const amount = user.calculateThisWeekAmount("2016-01-05", "cash_out");
    expect(amount).toBe(0);
  });

  it("Should amount zero", () => {
    const user = new User(1, "juridical");
    const amount = user.calculateThisWeekAmount("2016-01-05", "cash_out");
    expect(amount).toBe(0);
  });
});
