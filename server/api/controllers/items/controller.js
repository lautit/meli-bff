import ItemsService from '../../services/items.service';
import AuthService from '../../services/auth.service';

export class Controller {
  async search(req, res) {
    const r = await ItemsService.search(req.query.q);
    const author = AuthService.getAuthor();
    if (r) {
      req.log.info('searched');
      res.json({ ...r, author });
    } else {
      req.log.error('error searching');
      res.status(404).end();
    }
  }

  async retrieve(req, res) {
    const r = await ItemsService.retrieve(req.params.id);
    const author = AuthService.getAuthor();
    if (r) {
      res.log.info('retrieved');
      res.json({ ...r, author });
    } else {
      res.log.error('error retrieving');
      res.status(204).end();
    }
  }
}
export default new Controller();
