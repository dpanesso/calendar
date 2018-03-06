// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './Navbar';
import Modal from './Modal';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
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

  const onNewEvent = () => {
    const id = userEvents.length;
    const { title, start, end } = userBuffer;
    const newMeeting = {
      id,
      title,
      start,
      end,
    };
    // this.setState({
    //   userEvents: [
    //     ...userEvents,
    //     newMeeting,
    //   ],
    // });
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
    // this.setState({
    //   userEvents: newState,
    // });
    submitEvent(newState);
    handleClose();
  };

  const onUpdateFieldEvent = (key: string, value: any) => {
    const { start, end } = userBuffer;
    switch (key) {
      case 'title':
        // this.setState({
        //   userBuffer: {
        //     ...userBuffer,
        //     title: value,
        //   },
        // });
        updateField('title', value);
        break;
      case 'start date':
        // this.setState({
        //   userBuffer: {
        //     ...userBuffer,
        //     start: rebuildDate(start, value),
        //   },
        // });
        updateField('start', rebuildDate(start, value));
        break;
      case 'end date':
        // this.setState({
        //   userBuffer: {
        //     ...userBuffer,
        //     end: rebuildDate(end, value),
        //   },
        // });
        updateField('end', rebuildDate(start, value));
        break;
      case 'start time':
        // this.setState({
        //   userBuffer: {
        //     ...userBuffer,
        //     start: rebuildTime(start, value),
        //   },
        // });
        updateField('start', rebuildTime(start, value));
        break;
      case 'end time':
        // this.setState({
        //   userBuffer: {
        //     ...userBuffer,
        //     end: rebuildTime(end, value),
        //   },
        // });
        updateField('end', rebuildTime(end, value));
        break;
      default:
        console.log(`onUpdateFieldEvent - wrong key: ${key}`);
    }
  };

  const handleOpen = (event: Object) => {
    // const buffer = event;
    // let openNew = false;
    // let openUpdate = false;
    // if (!event.title) { // if new meeting
    //   buffer.title = defaultTitle;
    //   openNew = true;
    // } else { // update an existing meeting
    //   openUpdate = true;
    // }
    // this.setState({
    //   userBuffer: buffer,
    //   userOpenNew: openNew,
    //   userOpenUpdate: openUpdate,
    // });
    const kind = !event.title ? 'new meeting' : 'update meeting';
    openModal(kind, event);
  };

  const handleClose = () => {
    // this.setState({
    //   userOpenNew: false,
    //   userOpenUpdate: false,
    //   userBuffer: {},
    // });
    closeModal();
  };

  return (
    <div className="App">
      <Navbar />
      <BigCalendar
        selectable
        events={userEvents}
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
