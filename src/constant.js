CONST = {
    TYPE : {
        CASH_OUT: "cash_out",
        CASH_IN: "cash_in",
    },
    USER_TYPE : {
        NEUTRAL: "natural",
        LEGAL: "juridical",
    },
    CURRENCY : {
        EUR: "EUR",
    },

    CASH_IN_PERCENT : "0.03",
    CASH_OUT_PERCENT : "0.3",
    CASH_IN_MAX_LIMIT :  { amount: 5, currency: 'EUR'},
    NATURAL_CASH_OUT_WEEK_LIMIT : { amount: 1000, currency: 'EUR'},
    LEGAL_CASH_OUT_MIN_LIMIT : { amount: .5, currency: 'EUR'}

}

module.exports = CONST
