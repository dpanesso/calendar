// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../containers/Navbar';
import Home from '../ui/Home';
import Calendar from '../ui/Calendar';
import Rooms from '../ui/Rooms';
import Whoops404 from '../ui/Whoops404';
import PrivateRoute from '../../utils/PrivateRoute';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
import { prefixURL, customPost, fetchUpdateUserEvents } from '../../utils/fetchHelpers';
import parseDates from '../../utils/parseDates';
import '../../styles/calendar.css';


type Props = {
  user: Object,
  loggedIn: boolean,
  userOpenNew: boolean,
  userOpenUpdate: boolean,
  userBuffer: Object,
  userEvents: Array<Object>,
  calendarLoading: boolean,
  openModal: Function,
  closeModal: Function,
  updateField: Function,
  updateEvents: Function,
  updateUser: Function,
  logOut: Function,
  submitCalendar: Function,
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
    updateEvents,
    submitCalendar,
    updateUser,
    logOut,
    calendarLoading,
  } = props;

  const handleOpen = (event: Object) => {
    const kind = !event.title ? 'new meeting' : 'update meeting';
    openModal(kind, event);
  };

  const handleClose = () => {
    closeModal();
  };

  const onNewEvent = () => {
    fetchUpdateUserEvents(userEvents, userBuffer, user, 'new')
      .then(({ newUserEvents, newRoomEvents }) => {
        updateEvents(newUserEvents, newRoomEvents);
        handleClose();
      });
  };

  const onUpdateEvent = () => {
    fetchUpdateUserEvents(userEvents, userBuffer, user, 'update')
      .then(({ newUserEvents, newRoomEvents }) => {
        updateEvents(newUserEvents, newRoomEvents);
        handleClose();
      });
  };

  const onSubmit = (key: string) => {
    submitCalendar();
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

  const onRemove = () => {
    fetchUpdateUserEvents(userEvents, userBuffer, user, 'remove')
      .then(({ newUserEvents, newRoomEvents }) => {
        updateEvents(newUserEvents, newRoomEvents);
        handleClose();
      });
  };

  const onLogin = (events) => {
    updateEvents(events, {});
    handleClose();
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
      case 'room':
        updateField('room', value);
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
          onLogin={onLogin}
          onLogOut={onLogOut}
        />
        <Switch>
          <Route exact path="/" render={() => <Home loggedIn={loggedIn} />} />
          <PrivateRoute
            path="/user"
            loggedIn={loggedIn}
            component={Calendar}
            events={parseDates(userEvents)}
            handleOpen={handleOpen}
            open={userOpenNew || userOpenUpdate}
            userOpenNew={userOpenNew}
            userBuffer={userBuffer}
            onUpdateFieldEvent={onUpdateFieldEvent}
            handleClose={handleClose}
            onSubmit={onSubmit}
            onRemove={onRemove}
            calendarLoading={calendarLoading}
          />
          <PrivateRoute
            path="/rooms"
            loggedIn={loggedIn}
            component={Rooms}
          />
          <Route component={Whoops404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppUI;
