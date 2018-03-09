// @flow
import uuidv1 from 'uuid/v1';

// For dev environment
export const prefixURL = (url: string) => {
  const prefix = window.location.hostname === 'localhost' ?
    'http://localhost:4000/' :
    '';
  return prefix + url;
};

export const customFetch = (url: string): Promise<Object> => fetch(url)
  .then(response => response.json())
  .catch(err => err);

export const customPost = (url: string, data: Object): Promise<any> => (
  new Promise((resolve, reject) => {
    fetch(url, {
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
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  }));

const sanitizeArray = (array: Array<Object>) => array.map((obj, index) => {
  const local = obj;
  local.id = index;
  return obj;
});

const filterEvents = (localEvents: Array<Object>, evt: Object) => (
  localEvents.filter(event => event.id !== evt.id)
);

export const fetchUpdateUserEvents = (userEvents: Array<Object>, userBuffer: Object, user: Object, mode: string): Promise<any> => (
  new Promise((resolve) => {
    const localEvents = userEvents.slice(); // clone userEvents to prevent mutation
    const { token } = user;
    const url = prefixURL('api/pri/update/user/events');
    const postData = {
      token,
      user,
      newEvents: [],
    };
    switch (mode) {
      case 'new': {
        const id = uuidv1();
        const { title, start, end } = userBuffer;
        const room = userBuffer.room || '';
        const newMeeting = {
          id,
          title,
          start,
          end,
          room,
        };
        postData.newEvents = [...userEvents, newMeeting];
        break;
      }
      case 'update': {
        const evt = Object.assign({}, userBuffer);
        // Remove old version from localEvents
        const filteredEvents = filterEvents(localEvents, evt);
        // Add the new event at the end of the array
        filteredEvents.push(evt);
        postData.newEvents = filteredEvents;
        break;
      }
      case 'remove': {
        localEvents.splice(userBuffer.id, 1);
        postData.newEvents = sanitizeArray(localEvents);
        break;
      }
      default: {
        break;
      }
    }

    customPost(url, postData)
      .then((res) => {
        if (res.error) {
          throw new Error('Could not add event to database.');
        }
        if (res.success) {
          const data = {
            newUserEvents: postData.newEvents,
            newRoomEvents: {}, // temporary,
          };
          resolve(data);
        }
      })
      .catch(err => console.error(err));
  }));
