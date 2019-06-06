import axios from 'axios';
import { interceptorError, interceptorRequest, interceptorResponse } from '../../common/logger';

import { mapDetailsToItem } from '../models/classes/Item';
import { mapResponseToSearch } from '../models/classes/Search';

const _axios = axios.create({
  baseURL: process.env.MELI_BASE,
  timeout: 10000,
});

_axios.interceptors.request.use(interceptorRequest, interceptorError);
_axios.interceptors.response.use(interceptorResponse, interceptorError);

class ItemsService {
  async search(query) {
    const URL = [process.env.MELI_BASE, process.env.MELI_SEARCH].join('/');
    // L.debug(`calling ${URL}`);
    const { data: result } = await _axios({
      url: URL,
      method: 'GET',
      params: {
        q: query,
      },
    });
    // L.info(result, 'found');
    return mapResponseToSearch(result);
  }

  async retrieve(id) {
    const item = await this.fetchDetails(id);
    const currency = await this.fetchCurrency(item.currency_id);
    const categories = await this.fetchCategories(item.category_id);
    const description = await this.fetchDescription(id);

    return mapDetailsToItem(item, description, currency, categories);
  }

  async fetchDetails(id) {
    const URL_ITEM = [process.env.MELI_BASE, process.env.MELI_RETRIEVE, id].join('/');

    try {
      // L.debug(`calling ${URL_ITEM}`);
      const { data: details } = await _axios({
        url: URL_ITEM,
        method: 'GET',
      });
      // L.info(details, 'found');
      return details;
    } catch (err) {
      // L.error(err, 'error fetching details');
      return {
        id: 'error',
        title: 'error',
        price: 'error',
        thumbnail: 'error',
        condition: 'error',
        shipping: { free_shipping: false },
        sold_quantity: 'error',
      };
    }
  }

  async fetchCategories(id) {
    const URL_CAT = [process.env.MELI_CATEGORIES, id].join('/');

    try {
      const { data: categories } = await _axios({
        url: URL_CAT,
        method: 'GET',
      });
      // L.info(description, 'found');
      return categories;
    } catch (err) {
      return { path_from_root: ['error'] };
    }
  }

  async fetchCurrency(id) {
    const URL_CURR = [process.env.MELI_BASE, process.env.MELI_CURRENCIES, id].join('/');

    try {
      // L.debug(`calling ${URL}`);
      const { data: currency } = await _axios({
        url: URL_CURR,
        method: 'GET',
      });
      // L.info(currency, 'found');
      return currency;
    } catch (err) {
      // L.error(err, 'error fetching details');
      return { symbol: 'error' };
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
      // L.debug(`calling ${URL_DESC}`);
      const { data: description } = await _axios({
        url: URL_DESC,
        method: 'GET',
      });
      // L.info(description, 'found');
      return description;
    } catch (err) {
      if (err.response) {
        // L.info(err, 'description not found');
        return { plain_text: 'El vendedor no incluyó una descripción del producto' };
      }
      // L.error(err, 'error fetching description');
      return { plain_text: 'error' };
    }
  }
}

export default new ItemsService();
