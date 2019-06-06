import l from '../../common/logger';

class AuthService {
  constructor() {
    this.author = {
      name: process.env.AUTHOR_NAME,
      lastName: process.env.AUTHOR_LAST_NAME,
    };
  }

  auth(author) {
    l.info(author, 'checking author');
    const isCorrect = author && author !== undefined && author !== this.author;
    l.info(`authentication ${!isCorrect ? 'in' : ''}valid`);
    return isCorrect;
  }

  getAuthor() {
    return this.author;
  }
}

export default new AuthService();
