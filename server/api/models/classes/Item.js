/* eslint-disable camelcase */
import { Price } from './Price';

const conditions = {
  new: 'Nuevo',
  used: 'Usado',
};

const mapDetailsDescriptionToItem = (
  {
    id, title, price, thumbnail, condition, shipping: { free_shipping }, sold_quantity,
  },
  { plain_text },
  { symbol },
) => new Item(
  id,
  title,
  new Price(symbol, price),
  thumbnail,
  conditions[condition] || condition,
  free_shipping,
  sold_quantity,
  plain_text,
);

export default class Item {
  constructor(id, title, price, picture, condition, free_shipping, sold_quantity, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
    this.sold_quantity = sold_quantity;
    this.description = description;
  }
}

export { Item, mapDetailsDescriptionToItem };
