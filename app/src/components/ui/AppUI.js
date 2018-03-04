// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from './Navbar';
import Modal from './Modal';
import events from '../../utils/events';
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
      userEvents: events,
    },
  }

  handleOpenEvent = (event: Object) => {
    const { userEventChooser } = this.state;
    userEventChooser.open.eventModal = true;
    userEventChooser.event = event;
    this.setState({ userEventChooser });
  };

  handleOpenSlot = (slotInfo: Object) => {
    const { userEventChooser } = this.state;
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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    const {
      userEvents,
      event,
      slotInfo,
      open,
    } = this.state.userEventChooser;

// onSelectSlot={slotInfo => alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
//                                 `\nend: ${slotInfo.end.toLocaleString()}` +
//                                 `\naction: ${slotInfo.action}`)

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
        >
          <Modal open={open} event={event} slotInfo={slotInfo} />
        </Dialog>
      </div>
    );
  }
}

export default AppUI;
