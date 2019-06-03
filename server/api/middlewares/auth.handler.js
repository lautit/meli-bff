// eslint-disable-next-line no-unused-vars, no-shadow
import L from '../../common/logger';

export default function authHandler(req, res, next) {
  const author = {
    name: 'Lautaro',
    lastName: 'Tejerina',
  };
  L.info(req, 'incoming req');
  res.append('X-Author', author);
  next();
}
