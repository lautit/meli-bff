import * as express from 'express';
import controller from './controller';
import authHandler from '../../middlewares/auth.handler';

export default express
  .Router()
  .use(authHandler)
  .get('/', controller.search)
  .get('/:id', controller.retrieve);
