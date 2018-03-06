// @flow


// For dev environment
export const prefixURL = (url: string) => {
  const prefix = window.location.hostname === 'localhost' ?
    'http://localhost:4000/' :
    '';
  return prefix + url;
};

export const customFetch = (url: string): Promise<Object> => fetch(url)
  .then(response => response.json());

export const customPost = (url: string, data: Object): Promise<Object> => fetch(url, {
  body: JSON.stringify(data), // must match 'Content-Type' header
  cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *omit
  headers: {
    'content-type': 'application/json',
  },
  method: 'POST', // *GET, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *same-origin
  redirect: 'follow', // *manual, error
  referrer: 'no-referrer', // *client
})
  .then(response => {
    console.log("========Response customPost");
    console.log(response);
    return response.json()
  });
