class Convertor {
    constructor(baseCurrencyBuy, baseCurrencySale) {
        this._baseCurrencyBuy = baseCurrencyBuy;
        this._baseCurrencySale = baseCurrencySale;
    }

    roundToDecimal(amount) {
        return Math.round(100 * amount)/100;
    }

    fromTo(currency) {
        return this.roundToDecimal(currency * this._baseCurrencyBuy);
    }

    toFrom(currency) {
        return this.roundToDecimal(currency / this._baseCurrencySale );
    }
}

module.exports = Convertor;
