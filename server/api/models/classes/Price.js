/* eslint-disable camelcase */
const calculate = price => {
  if (typeof price !== 'number') return {};

  const [amount, decimals] = price.toString().split('.');

  return {
    amount: parseInt(amount, 10),
    decimals: parseInt(decimals, 10),
  };
};

export default class Price {
  constructor(currency_id, price) {
    this.currency = currency_id;

    this.amount = calculate(price).amount;
    this.decimals = calculate(price).decimals;
  }
}

export { Price };
