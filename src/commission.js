const CONST = require("./constant");

class Limit {
  constructor({ amount, currency }) {
    this.amount = amount;
    this.currency = currency;
  }
}

class Commission {
  constructor(type, percent, maxLimit, minLimit, weekLimit) {
    this.type = type;
    this.percent = percent;
    this.maxLimit = maxLimit;
    this.minLimit = minLimit;
    this.weekLimit = weekLimit;
  }

  static getCommission(type, user_type) {
    if (type === CONST.TYPE.CASH_IN) {
      return Commission.getCashInCommission();
    } else if (type === CONST.TYPE.CASH_OUT) {
      if (user_type === CONST.USER_TYPE.LEGAL) {
        return Commission.getCashOutLegalCommission();
      } else if (user_type === CONST.USER_TYPE.NEUTRAL) {
        return Commission.getCashOutNaturalCommission();
      }
    }

    throw "invalid type or user_type " + type + user_type;
  }

  static getCashInCommission() {
    return new Commission(
      CONST.TYPE.CASH_IN,
      CONST.CASH_IN_PERCENT,
      new Limit(CONST.CASH_IN_MAX_LIMIT),
      null,
      null
    );
  }

  static getCashOutLegalCommission() {
    return new Commission(
      CONST.TYPE.CASH_IN,
      CONST.CASH_OUT_PERCENT,
      null,
      new Limit(CONST.LEGAL_CASH_OUT_MIN_LIMIT),
      null
    );
  }

  static getCashOutNaturalCommission() {
    return new Commission(
      CONST.TYPE.CASH_OUT,
      CONST.CASH_OUT_PERCENT,
      null,
      null,
      new Limit(CONST.NATURAL_CASH_OUT_WEEK_LIMIT)
    );
  }
}

module.exports = Commission;
