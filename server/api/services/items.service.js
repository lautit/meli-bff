import axios from 'axios';
import L from '../../common/logger';

import { mapDetailsDescriptionToItem } from '../models/classes/Item';
import { mapResponseToSearch } from '../models/classes/Search';

class ItemsService {
  async search(query) {
    const URL = [process.env.MELI_BASE, process.env.MELI_SEARCH].join('/');

    L.debug(`calling ${URL}`);

    const { data: result } = await axios.get(URL, {
      params: {
        q: query,
      },
    });

    L.info(result, 'found');
    return mapResponseToSearch(result);
  }

  async retrieve(id) {
    const item = await this.fetchDetails(id);
    let description;
    try {
      description = await this.fetchDescription(id);
    } catch (err) {
      L.error(err, 'error fetching description');
      description = {
        plain_text: 'El vendedor no incluyó una descripción del producto',
      };
    }
    const currency = await this.fetchCurrency(item.currency_id);

    return mapDetailsDescriptionToItem(item, description, currency);
  }

  async fetchCurrency(id) {
    const URL = [process.env.MELI_BASE, process.env.MELI_CURRENCIES, id].join('/');

    try {
      L.debug(`calling ${URL}`);

      const { data: currency } = await axios.get(URL);

      L.info(currency, 'found');
      return currency;
    } catch (err) {
      L.error(err, 'error fetching details');
      return "couldn't fetch";
    }
  }

  async fetchDetails(id) {
    const URL_ITEM = [process.env.MELI_BASE, process.env.MELI_RETRIEVE, id].join('/');

    try {
      L.debug(`calling ${URL_ITEM}`);

      const { data: details } = await axios.get(URL_ITEM);

      L.info(details, 'found');
      return details;
    } catch (err) {
      L.error(err, 'error fetching details');
      return "couldn't fetch";
    }
  }

  async fetchDescription(id) {
    const URL_DESC = [
      process.env.MELI_BASE,
      process.env.MELI_RETRIEVE,
      id,
      process.env.MELI_RETRIEVE_DESCRIPTION,
    ].join('/');

    try {
      L.debug(`calling ${URL_DESC}`);

      const { data: description } = await axios.get(URL_DESC);

      L.info(description, 'found');
      return description;
    } catch (err) {
      if (err.response) {
        L.info(err, 'description not found');
        throw err.response.data;
      }

      L.error(err, 'error fetching description');
      throw err;
    }
  }
}

export default new ItemsService();
