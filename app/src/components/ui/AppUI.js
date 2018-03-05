// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './Navbar';
import Modal from './Modal';
import sampleEvents from '../../constants/sampleEvents';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
import { defaultTitle } from '../../constants';
import '../../styles/calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

type State = {
  userMeetingCalendar: {
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
    userMeetingCalendar: {
      open: {
        updateMeetingModal: false,
        newMeetingModal: false,
      },
      buffer: {},
      userEvents: sampleEvents,
    },
  }

  onSubmit = (key: string) => {
    switch (key) {
      case 'update meeting':
        this.onUpdateEvent();
        break;
      case 'new meeting':
        this.onNewEvent();
        break;
      default:
        console.log(`onSubmit - wrong key: ${key}`);
    }
  };

  onNewEvent = () => {
    const { userMeetingCalendar } = this.state;
    const tmpValues = userMeetingCalendar.buffer;
    const id = userMeetingCalendar.userEvents.length;
    const { title, start, end } = tmpValues;
    const newEvent = {
      id,
      title,
      start,
      end,
    };
    userMeetingCalendar.userEvents.push(newEvent);
    this.setState({ userMeetingCalendar });
    this.handleClose();
  };

  onUpdateEvent = () => {
    const { userMeetingCalendar } = this.state;
    const tmpValues = userMeetingCalendar.buffer;
    const evt = userMeetingCalendar.userEvents[tmpValues.id];
    evt.title = tmpValues.title;
    evt.start = tmpValues.start;
    evt.end = tmpValues.end;
    this.setState({ userMeetingCalendar });
    this.handleClose();
  };

  onUpdateKeyEvent = (key: string, value: Date) => {
    const { userMeetingCalendar } = this.state;
    const { buffer } = userMeetingCalendar;
    const { start, end } = buffer;
    let newState = {};
    switch (key) {
      case 'title':
        newState = {
          ...userMeetingCalendar,
          buffer: {
            ...buffer,
            title: value,
          },
        };
        this.setState({ userMeetingCalendar: newState });
        break;
      case 'start date':
        newState = {
          ...userMeetingCalendar,
          buffer: {
            ...buffer,
            start: rebuildDate(start, value),
          },
        };
        this.setState({ userMeetingCalendar: newState });
        break;
      case 'end date':
        newState = {
          ...userMeetingCalendar,
          buffer: {
            ...buffer,
            end: rebuildDate(end, value),
          },
        };
        this.setState({ userMeetingCalendar: newState });
        break;
      case 'start time':
        newState = {
          ...userMeetingCalendar,
          buffer: {
            ...buffer,
            start: rebuildTime(start, value),
          },
        };
        this.setState({ userMeetingCalendar: newState });
        break;
      case 'end time':
        newState = {
          ...userMeetingCalendar,
          buffer: {
            ...buffer,
            end: rebuildTime(end, value),
          },
        };
        this.setState({ userMeetingCalendar: newState });
        break;
      default:
        console.log(`onUpdateKeyEvent - wrong key: ${key}`);
    }
  };

  handleOpen = (event: Object) => {
    const { userMeetingCalendar } = this.state;
    userMeetingCalendar.buffer = event;
    // if new meeting
    if (!event.title) {
      userMeetingCalendar.buffer.title = defaultTitle;
      userMeetingCalendar.open.newMeetingModal = true;
    } else { // update an existing meeting
      userMeetingCalendar.open.updateMeetingModal = true;
    }
    this.setState({ userMeetingCalendar });
  };

  handleClose = () => {
    const { userMeetingCalendar } = this.state;
    userMeetingCalendar.open.updateMeetingModal = false;
    userMeetingCalendar.open.newMeetingModal = false;
    this.setState({ userMeetingCalendar });
  };

  render() {
    const {
      userEvents,
      buffer,
      open,
    } = this.state.userMeetingCalendar;

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
            onUpdateKeyEvent={this.onUpdateKeyEvent}
            handleClose={this.handleClose}
            onSubmit={this.onSubmit}
          />
        </Dialog>
      </div>
    );
  }
}

export default AppUI;
