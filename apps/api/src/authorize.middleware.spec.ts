import { AuthorizeMiddleware } from './authorize.middleware';

describe('AuthorizeMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthorizeMiddleware()).toBeDefined();
  });
});
