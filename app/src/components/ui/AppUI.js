// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './Navbar';
import Modal from './Modal';
import events from '../../utils/events';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
import { defaultTitle } from '../../constants';
import '../../styles/calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

type State = {
  userEventChooser: {
    open: {
      updateMeetingModal: boolean,
      newMeetingModal: boolean,
    },
    buffer: Object,
    userEvents: Array<Object>,
  },
};

class AppUI extends Component<{}, State> {
  state = {
    userEventChooser: {
      open: {
        updateMeetingModal: false,
        newMeetingModal: false,
      },
      buffer: {},
      userEvents: events,
    },
  }

  onSubmit = (key: string) => {
    switch (key) {
      case 'update meeting':
        this.updateEvent();
        break;
      case 'new meeting':
        this.onNewEvent();
        break;
      default:
        console.log(`onSubmit - wrong key: ${key}`);
    }
  };

  onNewEvent = () => {
    const { userEventChooser } = this.state;
    const tmpValues = userEventChooser.buffer;
    const id = userEventChooser.userEvents.length;
    const { title, start, end } = tmpValues;
    const newEvent = {
      id,
      title,
      start,
      end,
    };
    userEventChooser.userEvents.push(newEvent);
    this.setState({ userEventChooser });
    this.handleClose();
  };

  updateEvent = () => {
    const { userEventChooser } = this.state;
    const tmpValues = userEventChooser.buffer;
    const evt = userEventChooser.userEvents[tmpValues.id];
    evt.title = tmpValues.title;
    evt.start = tmpValues.start;
    evt.end = tmpValues.end;
    this.setState({ userEventChooser });
    this.handleClose();
  };

  updateKeyEvent = (key: string, value: Date) => {
    const { userEventChooser } = this.state;
    const { buffer } = userEventChooser;
    const { start, end } = buffer;
    let newState = {};
    switch (key) {
      case 'title':
        newState = {
          ...userEventChooser,
          buffer: {
            ...buffer,
            title: value,
          },
        };
        this.setState({ userEventChooser: newState });
        break;
      case 'start date':
        newState = {
          ...userEventChooser,
          buffer: {
            ...buffer,
            start: rebuildDate(start, value),
          },
        };
        this.setState({ userEventChooser: newState });
        break;
      case 'end date':
        newState = {
          ...userEventChooser,
          buffer: {
            ...buffer,
            end: rebuildDate(end, value),
          },
        };
        this.setState({ userEventChooser: newState });
        break;
      case 'start time':
        newState = {
          ...userEventChooser,
          buffer: {
            ...buffer,
            start: rebuildTime(start, value),
          },
        };
        this.setState({ userEventChooser: newState });
        break;
      case 'end time':
        newState = {
          ...userEventChooser,
          buffer: {
            ...buffer,
            end: rebuildTime(end, value),
          },
        };
        this.setState({ userEventChooser: newState });
        break;
      default:
        console.log(`updateKeyEvent - wrong key: ${key}`);
    }
  };

  handleOpen = (event: Object) => {
    const { userEventChooser } = this.state;
    userEventChooser.buffer = event;
    // if new meeting
    if (!event.title) {
      userEventChooser.buffer.title = defaultTitle;
      userEventChooser.open.newMeetingModal = true;
    } else { // update an existing meeting
      userEventChooser.open.updateMeetingModal = true;
    }
    this.setState({ userEventChooser });
  };

  handleClose = () => {
    const { userEventChooser } = this.state;
    userEventChooser.open.updateMeetingModal = false;
    userEventChooser.open.newMeetingModal = false;
    this.setState({ userEventChooser });
  };

  render() {
    const {
      userEvents,
      buffer,
      open,
    } = this.state.userEventChooser;

    return (
      <div className="App">
        <Navbar />
        <BigCalendar
          selectable
          events={userEvents}
          defaultView="week"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={this.handleOpen}
          onSelectSlot={this.handleOpen}
        />
        <Dialog
          modal={false}
          open={open.updateMeetingModal || open.newMeetingModal}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Modal
            open={open}
            buffer={buffer}
            updateKeyEvent={this.updateKeyEvent}
            handleClose={this.handleClose}
            onSubmit={this.onSubmit}
          />
        </Dialog>
      </div>
    );
  }
}

export default AppUI;
