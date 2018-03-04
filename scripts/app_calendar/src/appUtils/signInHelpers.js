// @flow

// regexp messing with eslint
/* eslint no-useless-escape: "off" */

export const isValidPassword = (password: string) => {
/*
            /^
              (?=.*\d)          // should contain at least one digit
              (?=.*[a-z])       // should contain at least one lower case
              (?=.*[A-Z])       // should contain at least one upper case
              [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
            $/
*/
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return re.test(password);
};

export const isValidUsername = (password: string) => {
/*
            /^
              [a-zA-Z0-9]{6,}   // should contain at least 6 from the mentioned characters
            $/
*/
  const re = /^[a-zA-Z0-9]{6,}$/;
  return re.test(password);
};
