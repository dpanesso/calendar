// the linter thinks it's Jest expect when it is chai instead
/* eslint jest/valid-expect: "off" */

const { expect } = require('chai');
const mock = require('./mock');
const { encrypt, encryptSHA, compareHash } = require('../utils/encrypt');
const createUser = require('../services/database/queries/createUser');
const getUserById = require('../services/database/queries/getUserData');


describe('Utils functions', () => {
  let sha = '';
  let dbHash = '';
  it('encryptSHA', () => {
    const password = 'my password';
    const email = 'my email';
    sha = encryptSHA(password, email);
    expect(sha).to.equal('f79b950fb602fa37c77177140564e6126421f79438e6f9205d44bf0a088675ac');
  });

  it('encrypt', () => {
    dbHash = encrypt(sha);
    expect(dbHash).not.to.equal(null);
  });

  it('compareHash', () => {
    const isValid = compareHash(sha, dbHash);
    expect(isValid).to.equal(true);
  });
});

describe('Database queries', () => {
  const { username, email, password } = mock.user;
  it('Create user', () => {
    createUser(username, email, password);
  });

  it('Get user data', () => {
    const mockUser = mock.dbUser;
    getUserById(email).then((user) => {
      expect(user).to.equal(mockUser);
    });
  });
});
