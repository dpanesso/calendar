// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../containers/Navbar';
import Modal from './Modal';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
import parseDates from '../../utils/parseDates';
import '../../styles/calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

type Props = {
  userOpenNew: boolean,
  userOpenUpdate: boolean,
  userBuffer: Object,
  userEvents: Array<Object>,
  openModal: Function,
  closeModal: Function,
  updateField: Function,
  submitEvent: Function,
};

const AppUI = (props: Props) => {
  const {
    userOpenNew,
    userOpenUpdate,
    userBuffer,
    userEvents,
    openModal,
    closeModal,
    updateField,
    submitEvent,
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
    <div className="App">
      <Navbar />
      <BigCalendar
        selectable
        events={parseDates(userEvents)}
        defaultView="week"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={handleOpen}
        onSelectSlot={handleOpen}
      />
      <Dialog
        modal={false}
        open={userOpenNew || userOpenUpdate}
        onRequestClose={handleClose}
        autoScrollBodyContent={true}
        contentStyle={{ width: '350px' }}
      >
        <Modal
          userOpenNew={userOpenNew}
          userBuffer={userBuffer}
          onUpdateFieldEvent={onUpdateFieldEvent}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      </Dialog>
    </div>
  );
};

export default AppUI;
