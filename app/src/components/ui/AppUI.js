// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './Navbar';
import Modal from './Modal';
import events from '../../utils/events';
import { rebuildDate, rebuildTime } from '../../utils/rebuildDate';
import '../../styles/calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

type State = {
  userEventChooser: {
    open: {
      eventModal: boolean,
      slotModal: boolean,
    },
    event: Object,
    slotInfo: Object,
    buffer: Object,
    userEvents: Array<Object>,
  },
};

class AppUI extends Component<{}, State> {
  state = {
    userEventChooser: {
      open: {
        eventModal: false,
        slotModal: false,
      },
      event: {},
      slotInfo: {},
      buffer: {},
      userEvents: events,
    },
  }

  handleOpenEvent = (event: Object) => {
    const { userEventChooser } = this.state;
    userEventChooser.buffer = event;
    userEventChooser.open.eventModal = true;
    userEventChooser.event = event;
    this.setState({ userEventChooser });
  };

  handleOpenSlot = (slotInfo: Object) => {
    const { userEventChooser } = this.state;
    userEventChooser.buffer = slotInfo;
    userEventChooser.open.slotModal = true;
    userEventChooser.slotInfo = slotInfo;
    this.setState({ userEventChooser });
  };

  handleClose = () => {
    const { userEventChooser } = this.state;
    userEventChooser.open.eventModal = false;
    userEventChooser.open.slotModal = false;
    userEventChooser.slotInfo = {};
    userEventChooser.event = {};
    this.setState({ userEventChooser });
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
        console.log(value);
    }
  };

  updateEvent= () => {
    const { userEventChooser } = this.state;
    const tmpValues = userEventChooser.buffer;
    const evt = userEventChooser.userEvents[tmpValues.id];
    evt.title = tmpValues.title;
    evt.start = tmpValues.start;
    evt.end = tmpValues.end;
    this.setState({ userEventChooser });
    this.handleClose();
  };

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        style={{ marginRight: '20px' }}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.updateEvent}
      />,
    ];
    const {
      userEvents,
      event,
      slotInfo,
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
          onSelectEvent={evt => this.handleOpenEvent(evt)}
          onSelectSlot={slot => this.handleOpenSlot(slot)}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={open.eventModal || open.slotModal}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Modal
            open={open}
            event={event}
            slotInfo={slotInfo}
            updateKeyEvent={this.updateKeyEvent}
          />
        </Dialog>
      </div>
    );
  }
}

export default AppUI;
