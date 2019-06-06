import itemsRouter from './api/controllers/items/router';

export default function routes(app) {
  app.use('/api/v1/items', itemsRouter);
}
