import cookie from "../../src/helpers/cookie";

describe('helpers:cookie', () => {
  test('Should read cookie', () => {
    document.cookie = 'foo=bar';
    expect(cookie.read('foo')).toBe('bar');
  });

  test('Should return null if cookie name is not existed', () => {
    expect(cookie.read('baz')).toBeNull();
  })
});
