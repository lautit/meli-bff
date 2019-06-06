import AuthService from '../services/auth.service';

export default function authHandler(req, res, next) {
  const author = req.body.author || req.cookies.author;
  let message = 'Authorized';

  if (!author) {
    message = 'Unauthorized: No author provided';
    req.log.error(message);
    res.status(401).end(message);
  } else if (!AuthService.auth(author)) {
    message = 'Unauthorized: Author incorrect';
    req.log.error(message);
    res.status(401).end(message);
  }

  req.log.debug(message);
  next();
}
