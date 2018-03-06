/**
 * Warning: Some tests need the API to be running properly
 * You can launch it from ./api with "yarn start"
 */
import encrypt from '../utils/encrypt';
import parseDates from '../utils/parseDates';
import sampleDates from '../constants/sampleDates';
import sampleDatesStringify from '../constants/sampleDatesStringify';
import { customFetch, customPost, prefixURL } from '../utils/fetchHelpers';

it('encrypt', () => {
  const password = 'my password';
  const email = 'my email';
  const hash = encrypt(password, email);
  expect(hash).toBe('f79b950fb602fa37c77177140564e6126421f79438e6f9205d44bf0a088675ac');
});

it('parseDates', () => {
  const parsed = parseDates(sampleDatesStringify);
  expect(parsed).toEqual(sampleDates);
});

it('customFetch', () => {
  const url = 'https://api.ipify.org/?format=json';
  const ip = { ip: '176.185.194.90' };
  return customFetch(url).then(data => (
    expect(data).toEqual(ip)
  ));
});

const prefix = Math.random().toString(36).substring(7);
const email = `${prefix}@gmail.com`;
// only works when API is running
it('customPost - signup', () => {
  const url = prefixURL('api/auth/signup');
  const postData = {
    username: 'TheSnake',
    email,
    password: 'Thesnake6',
    confirmPassword: 'Thesnake6',
  };
  return customPost(url, postData).then(data => (
    expect(data).toEqual({})
  ));
});

// only works when API is running
it('customPost - login', () => {
  const url = prefixURL('api/auth/login');
  const password = encrypt('Thesnake6', email);
  const postData = {
    email,
    password,
  };
  return customPost(url, postData).then(data => (
    expect(data).toEqual({})
  ));
});
