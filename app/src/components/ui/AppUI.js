// @flow
import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../containers/Navbar';
import Home from '../ui/Home';
import Calendar from '../ui/Calendar';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
import { prefixURL, customPost } from '../../utils/fetchHelpers';
import parseDates from '../../utils/parseDates';
import '../../styles/calendar.css';


type Props = {
  user: Object,
  loggedIn: boolean,
  userOpenNew: boolean,
  userOpenUpdate: boolean,
  userBuffer: Object,
  userEvents: Array<Object>,
  openModal: Function,
  closeModal: Function,
  updateField: Function,
  submitEvent: Function,
  updateUser: Function,
  logOut: Function,
};

const AppUI = (props: Props) => {
  const {
    user,
    loggedIn,
    userOpenNew,
    userOpenUpdate,
    userBuffer,
    userEvents,
    openModal,
    closeModal,
    updateField,
    submitEvent,
    updateUser,
    logOut,
  } = props;

  const handleOpen = (event: Object) => {
    const kind = !event.title ? 'new meeting' : 'update meeting';
    openModal(kind, event);
  };

  const handleClose = () => {
    closeModal();
  };
  const onNewEvent = () => {
    const id = userEvents.length;
    const { title, start, end } = userBuffer;
    const newMeeting = {
      id,
      title,
      start,
      end,
    };
    submitEvent([
      ...userEvents,
      newMeeting,
    ]);
    handleClose();
  };

  const onUpdateEvent = () => {
    const newState = userEvents;
    const evt = userEvents[userBuffer.id];
    evt.title = userBuffer.title;
    evt.start = userBuffer.start;
    evt.end = userBuffer.end;
    newState[userBuffer.id] = evt;
    submitEvent(newState);
    handleClose();
  };

  const onSubmit = (key: string) => {
    switch (key) {
      case 'update meeting':
        onUpdateEvent();
        break;
      case 'new meeting':
        onNewEvent();
        break;
      default:
        console.log(`onSubmit - wrong key: ${key}`);
    }
  };

  const onLogOut = () => {
    const url = prefixURL('api/pri/logout');
    const postData = { token: user.token };
    customPost(url, postData)
      .then((response) => {
        if (response.success) {
          console.log(response.success);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    logOut();
  };

  const onUpdateFieldEvent = (key: string, value: any) => {
    const { start, end } = userBuffer;
    switch (key) {
      case 'title':
        updateField('title', value);
        break;
      case 'start date':
        updateField('start', rebuildDate(start, value).toString());
        break;
      case 'end date':
        updateField('end', rebuildDate(start, value).toString());
        break;
      case 'start time':
        updateField('start', rebuildTime(start, value).toString());
        break;
      case 'end time':
        updateField('end', rebuildTime(end, value).toString());
        break;
      default:
        console.log(`onUpdateFieldEvent - wrong key: ${key}`);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          user={user}
          updateUser={updateUser}
          loggedIn={loggedIn}
          onLogOut={onLogOut}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user" render={() => (
            <Calendar
              events={parseDates(userEvents)}
              handleOpen={handleOpen}
              open={userOpenNew || userOpenUpdate}
              userOpenNew={userOpenNew}
              userBuffer={userBuffer}
              onUpdateFieldEvent={onUpdateFieldEvent}
              handleClose={handleClose}
              onSubmit={onSubmit}
            />)}
          />

        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppUI;
