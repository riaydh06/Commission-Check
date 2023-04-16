const Commission = require("./commission");

class User {
  constructor(id, user_type) {
    this.id = id;
    this.user_type = user_type;
    this.operations = [];
  }

  calculate(operation) {
    let cal = this.calculateCommission(operation);
    console.log((Math.round(cal * 100) / 100).toFixed(2));
    this.operations.push(operation);
  }

  calculateCommission(operation) {
    let commission = Commission.getCommission(operation.type, this.user_type);
    let amount = operation.operation.amount;

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

    if (commission.maxLimit) {
      return Math.min(commission.maxLimit.amount, totalCommissionAmount);
    }

    if (commission.minLimit) {
      return Math.max(commission.minLimit.amount, totalCommissionAmount);
    }

    return totalCommissionAmount;
  }

  calculateThisWeekAmount(date, type) {
    let amount = 0;

    const monday = new Date(date);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const sunday = new Date(date);
    sunday.setDate(monday.getDate() + 6);
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
  }
}

module.exports = User;
