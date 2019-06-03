/* eslint-disable camelcase */
import { mapSearchResultToResult } from './Result';

// eslint-disable-next-line max-len
const mapResponseToSearch = ({ results, filters }) => new Search(results, filters);

const mapFiltersToCategories = filters => {
  const unfiltered = filters.find(filter => filter.id === 'category');
  const pathFromRoot = unfiltered && unfiltered.values && unfiltered.values.pop().path_from_root;
  const reducedCategories = pathFromRoot.reduce(
    (collection, category) => [...collection, category.name],
    [],
  );
  return reducedCategories;
};

export default class Search {
  constructor(results, filters) {
    this.items = results.map(mapSearchResultToResult);

    this.categories = mapFiltersToCategories(filters);
  }
}

export { Search, mapResponseToSearch };
