import examplesRouter from './api/controllers/examples/router';
import itemsRouter from './api/controllers/items/router';

export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/items', itemsRouter);
}
