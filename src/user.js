const Commission = require("./commission");

/** Create user class  */
class User {
  constructor(id, user_type) {
    this.id = id;
    this.user_type = user_type;
    this.operations = [];
  }

  calculate = (operation) => {
    let cal = this.calculateCommission(operation);
    /** Show commission value  */
    console.log((Math.round(cal * 100) / 100).toFixed(2));
    this.operations.push(operation);
  };

  /** Calculate commission of a single operation */
  calculateCommission = (operation) => {
    /** Get commission object  */
    let commission = Commission.getCommission(operation.type, this.user_type);
    /** Get operation amount  */
    let amount = operation.operation.amount;

    /** Get commission week limit  */
    if (commission.weekLimit) {
      let weekAmount = this.calculateThisWeekAmount(
        operation.date,
        operation.type
      );
      if (weekAmount < commission.weekLimit.amount) {
        amount -= commission.weekLimit.amount - weekAmount;
      }
    }

    if (amount < 0) amount = 0;

    let totalCommissionAmount = (amount * commission.percent) / 100;

    /** Get max limit amount  */
    if (commission.maxLimit) {
      return Math.min(commission.maxLimit.amount, totalCommissionAmount);
    }

    /** Get min limit amount  */
    if (commission.minLimit) {
      return Math.max(commission.minLimit.amount, totalCommissionAmount);
    }

    return totalCommissionAmount;
  };

  /** Calculate week amount  */
  calculateThisWeekAmount = (date, type) => {
    let amount = 0;

    const monday = new Date(date);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const sunday = new Date(date);
    sunday.setDate(monday.getDate() + 6);

    /** Iterating existing operations  */
    this.operations.map((operation) => {
      let operationDate = new Date(operation.date);
      if (
        operation.type === type &&
        operationDate >= monday &&
        operationDate <= sunday
      ) {
        amount += operation.operation.amount;
      }
    });

    return amount;
  };
}

module.exports = User;
