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
import { prefixURL, customPost } from '../../utils/fetchHelpers';
import parseDates from '../../utils/parseDates';
import sanitizeArray from '../../utils/array';
import '../../styles/calendar.css';
<<<<<<< HEAD

=======
import OnboardingComponent from './OnboardingComponent'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
>>>>>>> add onboarding for dapp

type Props = {
  user: Object,
  loggedIn: boolean,
  userOpenNew: boolean,
  userOpenUpdate: boolean,
  toggleDapp: boolean,
  userBuffer: Object,
  userEvents: Array<Object>,
  openModal: Function,
  closeModal: Function,
  updateField: Function,
  updateEvents: Function,
  updateUser: Function,
<<<<<<< HEAD
  logOut: Function,
=======
  onOnboardingDone: Function,
>>>>>>> add onboarding for dapp
};

const AppUI = (props: Props) => {
  const {
    user,
    loggedIn,
    userOpenNew,
    userOpenUpdate,
    toggleDapp,
    userBuffer,
    userEvents,
    openModal,
    closeModal,
    updateField,
    updateEvents,
    updateUser,
<<<<<<< HEAD
    logOut,
=======
    toggleDappEvent,
    onOnboardingDone,
>>>>>>> add onboarding for dapp
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
    updateEvents([
      ...userEvents,
      newMeeting,
<<<<<<< HEAD
    ], user);
=======
    ]);
    toggleDappEvent(true);
>>>>>>> add onboarding for dapp
    handleClose();
  };

  const onUpdateEvent = () => {
    const newState = userEvents;
    const evt = userEvents[userBuffer.id];
    evt.title = userBuffer.title;
    evt.start = userBuffer.start;
    evt.end = userBuffer.end;
    // We add the new event at the end of the array
    newState[userBuffer.id] = evt;
    updateEvents(newState);
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

  const onRemove = () => {
    const localEvents = userEvents.slice(); // cloneuserEvents to prevent mutation
    localEvents.splice(userBuffer.id, 1);
    const sanitized = sanitizeArray(localEvents);
    const url = prefixURL('api/pri/user');
    const { token } = user;
    const postData = {
      token,
      userEvents: sanitized,
    };
    customPost(url, postData)
      .then((res) => {
        if (res.error) {
          throw new Error('Could not add event to database.');
        }
        if (res.success) {
          updateEvents(sanitized);
        }
      })
      .catch(err => console.error(err));
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
      default:
        console.log(`onUpdateFieldEvent - wrong key: ${key}`);
    }
  };
console.log("+++++++");
console.log(toggleDapp);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          user={user}
          updateUser={updateUser}
          loggedIn={loggedIn}
          onLogOut={onLogOut}
        />
<<<<<<< HEAD
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
=======
      </Dialog>
      <OnboardingComponent isVisible={toggleDapp} onOnboardingDone={onOnboardingDone}/>
    </div>
>>>>>>> add onboarding for dapp
  );
};

export default AppUI;
