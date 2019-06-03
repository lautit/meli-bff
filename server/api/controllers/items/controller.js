import ItemsService from '../../services/items.service';

import L from '../../../common/logger';

export class Controller {
  async search(req, res) {
    L.debug(`searching ${req.query.q}`);

    const r = await ItemsService.search(req.query.q);
    r.author = res.get('X-Author');
    if (r) {
      res.json(r);
    } else {
      res.status(404).end();
    }
  }

  async retrieve(req, res) {
    L.debug(`retrieving ${req.params.id}`);

    const r = await ItemsService.retrieve(req.params.id);
    r.author = res.get('X-Author');
    if (r) {
      res.json(r);
    } else {
      res.status(204).end();
    }
  }
}
export default new Controller();
