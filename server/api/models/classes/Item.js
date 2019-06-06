/* eslint-disable camelcase */
import { Price } from './Price';

const conditions = {
  new: 'Nuevo',
  used: 'Usado',
};

const mapRootpathToCategories = pathFromRoot => pathFromRoot.name;

const mapDetailsToItem = (
  {
    id, title, price, thumbnail, condition, shipping: { free_shipping }, sold_quantity,
  },
  { plain_text },
  { symbol },
  { path_from_root },
) => new Item(
  id,
  title,
  new Price(symbol, price),
  thumbnail,
  conditions[condition] || condition,
  free_shipping,
  sold_quantity,
  plain_text,
  path_from_root.map(mapRootpathToCategories),
);

export default class Item {
  constructor(
    id,
    title,
    price,
    picture,
    condition,
    free_shipping,
    sold_quantity,
    description,
    categories,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
    this.sold_quantity = sold_quantity;
    this.description = description;
    this.categories = categories;
  }
}

export { Item, mapDetailsToItem };
