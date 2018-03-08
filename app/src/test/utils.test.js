/**
 * Warning: Some tests need the API to be running properly
 * You can launch it from ./api with "yarn start"
 */
import mock from './mock';
import encrypt from '../utils/encrypt';
import parseDates from '../utils/parseDates';
import sampleDates from '../constants/sampleDates';
import sampleDatesStringify from '../constants/sampleDatesStringify';
import { customFetch, customPost, prefixURL } from '../utils/fetchHelpers';

describe('Utils functions', () => {
  test('encrypt', () => {
    const password = 'my password';
    const email = 'my email';
    const hash = encrypt(password, email);
    expect(hash).toBe('f79b950fb602fa37c77177140564e6126421f79438e6f9205d44bf0a088675ac');
  });

  test('parseDates', () => {
    const parsed = parseDates(sampleDatesStringify);
    expect(parsed).toEqual(sampleDates);
  });

  test('customFetch', () => {
    const { url, content } = mock.customFetch;
    return customFetch(url).then(data => (
      expect(data).toEqual(content)
    ));
  });
});

describe('Endpoints', () => {
  const prefix = Math.random().toString(36).substring(7);
  const email = `${prefix}@gmail.com`;
  let token = '';
  // only works when API is running
  test('Signup', () => {
    const url = prefixURL('api/pub/signup');
    const postData = {
      username: 'TheSnake',
      email,
      password: 'Thesnake6',
      confirmPassword: 'Thesnake6',
    };
    return customPost(url, postData).then((data) => {
      expect(data.success).toEqual('Account successfully created. Please log in');
    });
  });

  // only works when API is running
  test('Login', () => {
    const url = prefixURL('api/pub/login');
    const password = encrypt('Thesnake6', email);
    const postData = {
      email,
      password,
    };
    return customPost(url, postData).then((data) => {
      token = data.user.token;
      expect(token.length).toBeGreaterThanOrEqual(20);
    });
  });

  // only works when API is running
  test('Loout', () => {
    const url = prefixURL('api/pri/logout');
    const postData = { token };
    return customPost(url, postData)
      .then((data) => {
        expect(data.success).toEqual('Successfully logged out');
      })
      .catch(err => console.log(err));
  });

  // only works when API is running
  test('New login with old token', () => {
    const url = prefixURL('api/pri/logout');
    const postData = { token };
    return customPost(url, postData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        expect(err).not.toBeNull();
      });
  });
});
