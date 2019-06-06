import * as express from 'express';
import controller from './controller';
import authHandler from '../../middlewares/auth.handler';

export default express
  .Router()
  .use(authHandler)
  .post('/', controller.search)
  .post('/:id', controller.retrieve);
