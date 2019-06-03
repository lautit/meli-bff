/* eslint-disable camelcase */
import { Price } from './Price';

const mapSearchResultToResult = ({
  id,
  title,
  price,
  currency_id,
  thumbnail,
  condition,
  shipping: { free_shipping },
}) => new Result(id, title, new Price(currency_id, price), thumbnail, condition, free_shipping);

class Result {
  constructor(id, title, price, picture, condition, free_shipping) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
  }
}

export { Result, mapSearchResultToResult };
